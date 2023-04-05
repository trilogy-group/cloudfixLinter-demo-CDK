import { Size, Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { aws_dynamodb as dynamodb } from 'aws-cdk-lib';
import { aws_ec2 as ec2 } from 'aws-cdk-lib';
import { aws_efs as efs, aws_s3 as s3 } from 'aws-cdk-lib';
import { EbsDeviceVolumeType, SubnetType, Vpc } from 'aws-cdk-lib/aws-ec2';
import { BucketEncryption } from 'aws-cdk-lib/aws-s3';
import * as cdk from 'aws-cdk-lib';
import { VPC_CIDR_BLOCK, AMI_ID, REGION, AVAILABILITY_ZONES, BRANCH_NAME } from '../lib/constants'
export class cdkProjectStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);


    //DynamoDB table 
    new dynamodb.Table(this, 'cloudfixlinter_cdk_demo_DynamoDBTable' + BRANCH_NAME, {
      partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
    });

    //Ebs vol
    const volume = new ec2.Volume(this, 'cloudfix_cdk_demo_DataVolume' + BRANCH_NAME, {
      availabilityZone: 'us-east-1a',
      size: Size.gibibytes(10),
      volumeType: EbsDeviceVolumeType.GENERAL_PURPOSE_SSD,
    })

    // vpc 
    const cdkDemoVpc = new Vpc(this, 'cloudfix_cdk_demo_vpc' + BRANCH_NAME, {
      cidr: VPC_CIDR_BLOCK,
      maxAzs: 2,
      subnetConfiguration: [
        {
          name: 'public',
          subnetType: SubnetType.PUBLIC,
          cidrMask: 24
        },
        {
          name: 'private',
          subnetType: SubnetType.PRIVATE_ISOLATED,
          cidrMask: 24
        }
      ]
    });

    // EC2 instance - 1
    new ec2.Instance(this, 'cloudfix_cdk_demo_AppServer' + BRANCH_NAME, {
      instanceType: ec2.InstanceType.of(ec2.InstanceClass.T2, ec2.InstanceSize.MICRO),
      machineImage: ec2.MachineImage.latestAmazonLinux({
        generation: ec2.AmazonLinuxGeneration.AMAZON_LINUX_2,
      }),
      vpc: cdkDemoVpc
    });

    const publicSubnets = cdkDemoVpc.selectSubnets({
      subnetGroupName: 'public',
      availabilityZones: AVAILABILITY_ZONES // replace with your desired availability zones
    });


    // VPC endpoint
    new ec2.GatewayVpcEndpoint(this, 'cloudfix_cdk_demo_VpcEndpoint' + BRANCH_NAME, {
      service: { name: 'com.amazonaws.us-east-1.s3' },
      vpc: cdkDemoVpc,
      subnets: [
        { subnetType: ec2.SubnetType.PUBLIC }
      ],

    });

    //s3 Bucket 
    new s3.Bucket(this, 'cloudfix-cdk-demo-s3bucket1' + BRANCH_NAME, {
      versioned: true,
      accessControl: s3.BucketAccessControl.PRIVATE,
    });

    // EFS file system
    new efs.FileSystem(this, 'cloudfix_cdk_demo_FileSystem' + BRANCH_NAME, {
      vpc: cdkDemoVpc,
      encrypted: true,
    });

    //Ec2 instance - 2
    new ec2.Instance(this, 'cloudfix_cdk_demo_ec2_Instance_2' + BRANCH_NAME, {
      instanceType: ec2.InstanceType.of(ec2.InstanceClass.T2, ec2.InstanceSize.MICRO),
      machineImage: new ec2.AmazonLinuxImage(),
      vpc: cdkDemoVpc,
      vpcSubnets: {
        subnetType: ec2.SubnetType.PRIVATE_ISOLATED
      }
    });

    // Allocate an Elastic IP address in the same VPC
    const eip = new ec2.CfnEIP(this, 'MyEIP' + BRANCH_NAME, {
      domain: 'cdkDemoVpc',
    });

    const natGateway = new ec2.CfnNatGateway(this, 'cloudfix_cdk_demo_natGateway' + BRANCH_NAME, {
      allocationId: eip.attrAllocationId,
      subnetId: cdkDemoVpc.publicSubnets[0].subnetId,
    });

  }
}
