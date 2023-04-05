import { Size, Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { aws_dynamodb as dynamodb } from 'aws-cdk-lib';
import { aws_ec2 as ec2 } from 'aws-cdk-lib';
import { aws_efs as efs, aws_s3 as s3 } from 'aws-cdk-lib';
// import * as neptune from '@aws-cdk/aws-neptune-alpha';
import { EbsDeviceVolumeType, SubnetType, Vpc } from 'aws-cdk-lib/aws-ec2';
import { BucketEncryption } from 'aws-cdk-lib/aws-s3';
import * as cdk from 'aws-cdk-lib';
import { AVAILABILITYZONES, PRIVATE_SUBNETIDS, PRIVATE_SUBNET_ROUTETABLEIDS, PUBLIC_SUBNETIDS, PUBLIC_SUBNET_ROUTETABLEIDS, VPC_ID } from './constants';

export class cdkProjectStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);


    //DynamoDB table 
    const table = new dynamodb.Table(this, 'cloudfix-cdk-demo-Dynamotable', {
      partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
    });

    //Ebs vol
    const volume = new ec2.Volume(this, 'cloudfix-cdk-demo-DataVolume', {
      availabilityZone: 'us-east-1a',
      size: Size.gibibytes(10),
      volumeType: EbsDeviceVolumeType.GENERAL_PURPOSE_SSD,
    })

    // vpc 
    const DefaultVpc = Vpc.fromVpcAttributes(this, 'cloudfix-cdk-demo-Vpc', {
      vpcId: VPC_ID,
      availabilityZones: AVAILABILITYZONES,
      privateSubnetIds: PRIVATE_SUBNETIDS,
      publicSubnetIds: PUBLIC_SUBNETIDS,
      publicSubnetRouteTableIds: PUBLIC_SUBNET_ROUTETABLEIDS,
      privateSubnetRouteTableIds: PRIVATE_SUBNET_ROUTETABLEIDS
    });

    // EC2 instance - 1
    const instance = new ec2.Instance(this, 'cloudfix-cdk-demo-AppServer', {
      instanceType: ec2.InstanceType.of(ec2.InstanceClass.T2, ec2.InstanceSize.MICRO),
      machineImage: ec2.MachineImage.latestAmazonLinux({
        generation: ec2.AmazonLinuxGeneration.AMAZON_LINUX_2,
      }),
      vpc: DefaultVpc
    });

    //Ec2 instance - 2
    new ec2.Instance(this, `cloudfix-cdk-demo-instance-appserver`, {
      instanceType: ec2.InstanceType.of(ec2.InstanceClass.T2, ec2.InstanceSize.MICRO),
      machineImage: new ec2.GenericLinuxImage({
        'us-east-1': 'ami-09d56f8956ab235b3',
      }),
      vpc: DefaultVpc,

    });

    // NAT gateway
    new ec2.CfnNatGateway(this, 'cloudfix-cdk-demo-Natgateway', {
      subnetId: PUBLIC_SUBNETIDS[1],
      // the properties below are optional
      connectivityType: 'private',
    });

    // VPC endpoint
    new ec2.GatewayVpcEndpoint(this, 'cloudfix-cdk-demo-MyVpcEndpoint', {
      service: { name: 'com.amazonaws.us-east-1.s3' },
      vpc: DefaultVpc,
      subnets: [
        { subnetType: ec2.SubnetType.PUBLIC }
      ],

    });

    const bucketNamePrefix = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    //s3 Bucket - 1
    const bucket = new s3.Bucket(this, 'cloudfix-cdk-demo-s3-1' + bucketNamePrefix, {
      bucketName: "cloudfix-s3-bucket-1",
      versioned: true,
      accessControl: s3.BucketAccessControl.PRIVATE,
    });

    const bucket2 = new s3.Bucket(this, 'cloudfix-cdk-demo-s3-2' + bucketNamePrefix, {
      bucketName: "cloudfix-s3-bucket-2",
      encryption: BucketEncryption.S3_MANAGED,
      versioned: true,
      accessControl: s3.BucketAccessControl.PUBLIC_READ_WRITE,
    });

    // EFS file system
    new efs.FileSystem(this, 'cloudfix-cdk-demo-MyFileSystem', {
      vpc: DefaultVpc,
      encrypted: true,
    });

  }
}
