# cloudfixLinter-demo-CDK
Demo repository to test cloudfix-linter for cdk

## Prerequisite

1. Install Cloudfix linter extension from [here](https://open-vsx.trilogy.devspaces.com/extension/devfactory/cloudfix-linter). Extension installs this on its own on Devspaces.

## Steps for demo

1. Install the node_modules for the CDK project
    ```
    npm i
    ```
2. AWS Creds setup
   - Login to AWS using terminal (in default profile) by any of the following options:
     - `aws configure` to login with permanent credentials (using `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`)
     - To login with temporary credentials (`AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_SESSION_TOKEN`, `AWS_SECURITY_TOKEN`), follow [this](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_temp_use-resources.html#using-temp-creds-sdk-cli)
     - Using `saml2aws`. For user guide visit [here](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_temp_use-resources.html#using-temp-creds-sdk-cli)
      or 
    - Steps to setup saml2aws for Trilogy account holders -
      1.  run `saml2aws configure`
      2.  choose `KeyCloak` as service provider
      3.  Provide this url - https://devfactory.devconnect-df.com/auth/realms/devfactory/protocol/saml/clients/aws (url works for trilogy account holders only)
      4.  Enter your AD detials.     
      
    - Note: Setting `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_SESSION_TOKEN` as enviroment variables from terminal won't work because they are just available in the terminal instance in which have set them and not available globally.

3. Select the AWS profile with which AWS was logged in:
    1. Go to VS Code settings
    2. Search `cloudfix-liinter`
    3. Enter the profile in `AWS Profile` setting

4. Region set up   
   - The region for profile (chosen in the last step) should also be set to the region where the stack(s) exists. Use the command `aws configure`. Following is an example of setting the region to `us-east-1`
      ```
      AWS Access Key ID [****************H44M]: 
      AWS Secret Access Key [****************9jFj]: 
      Default region name [None]: us-east-1
      Default output format [None]:

5. This CDK project has 2 stacks, deploy them (if not done already)
    ```
    cdk deploy --all
    ```
    **Note : - For demo purpose we have already deployed both the stacks (CfDemoStack, CDKDemoStack2) in Q3 of TrilogyAccount. You can skip this step if you have logged in to the mentioned account.**
6. Run the following command to generate reccos
    ```
    python utils/gen_recco.py CfDemoStack CDKDemoStack2
    ```
7. Use mock cloudfix responses:
    1. Go to VS Code settings
    2. Search `cloudfix-liinter`
    3. Check `Override Cloud Fix Results For Testing`
8. Run (this is a temporary step, it'll be removed in future releases)
    ```
    cdk synth --output .cdkout
    ```
9. Open one of the typescript files and save it

10. Wait for a few seconds, and the recommendations will show up
