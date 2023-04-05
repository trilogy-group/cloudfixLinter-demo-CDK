# cloudfixLinter-demo-CDK
Demo repository to test cloudfix-linter for cdk

## Prerequisite

1. Install Cloudfix linter extension from [here](https://github.com/trilogy-group/cloudfixLinter-demo-CDK/blob/prepare-demo%231/lib/constants.ts). Extension gets installed on its own on Devspaces.
 

## Steps to use Repo with Extension

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
    2. Search `cloudfix-linter`
    3. Enter the profile in `AWS Profile` setting

4. Region set up   
   - The region for profile (chosen in the last step) should also be set to the region where the stack(s) exists. Use the command `aws configure`. Following is an example of setting the region to `us-east-1`
      ```
      AWS Access Key ID [****************H44M]: 
      AWS Secret Access Key [****************9jFj]: 
      Default region name [None]: us-east-1
      Default output format [None]:

5. This CDK project has 2 stacks, deploy them (if not done already)   
    #### NOTE- Please ensure that you have exported the `ACCOUNT_ID` and `REGION` as env vars before deploying resources.
    - To export  `ACCOUNT_ID` and `REGION` as env vars
    run 
    ```
    export ACCOUNT_ID=YOUR_AWS_ACCOUNT_ID; export REGION=us-east-1;cdk deploy --all
    ```
    **Note :-**    
       1. This will create .cdkout folder in your working directory with all the output from cdk deployment.  
       2. For demo purpose we have already deployed both the stacks (CfDemoStack, CDKDemoStack2) in Q3 of TrilogyAccount. You can skip this step if you have logged in to the mentioned account.
    
6. Run the following command to generate reccos
    ```
    python utils/gen_recco.py cdkProjectStack cdkProjectSimpleResources
    ```
7. Use mock cloudfix responses:
    1. Go to VS Code settings
    2. Search `cloudfix-linter`
    3. Check `Override Cloud Fix Results For Testing`
8. Run (this is a temporary step, it'll be removed in future releases)
    ```
    cdk synth --output .cdkout
    ```
9. Open one of the typescript files and save it

10. Wait for a few seconds, and the recommendations will show up


### Steps to use repo with Cloudfix-linter CLI
1. Follow the step 1 and step 2 mentioned above

2. Add the binary to `PATH` 
   1. For linux, macOS, devspaces
      ```
      export PATH=$PATH:~/.cloudfix-linter/bin
      ```
   2. For Windows
      ```
      $Env:PATH += ";${HOME}\.cloudfix-linter\bin"
      ```
    Note: In the following commands replce `cloudfix-linter` with `cloudfix-linter.exe` for windows

3. To check if path to cloudfix-linter has been set that succesfully, Run -

   ```
   cloudfix-linter --help  
   ```  
   
**Note - If you don't want to set path variable to cloudfix-linter cli. You can use the cli by going inside ~/.cloudfix-linter folder and running the same commands as below**

4. To use mock recommendations.
In order to generate mock recommnedations and tell the linter that it needs to read reccomendations from a file rather than from CloudFix itself, on the terminal run
    - Windows -
    ```
    $env:CLOUDFIX_FILE=$true
   python utils/gen_recco.py cdkProjectStack cdkProjectSimpleResources
    ```
    - Linux and Devspaces -

    ```
    export CLOUDFIX_FILE=true
    python utils/gen_recco.py cdkProjectStack cdkProjectSimpleResources
    ```

    #### To use cloudFix recommendations
    - Windows
    ```
    $env:CLOUDFIX_FILE=$false
    $env:CLOUDFIX_USERNAME="<MY_USERNAME>"
    $env:CLOUDFIX_PASSWORD="<PASSWORD>"
    ```
    - Linux and Devspaces
    ```
    export CLOUDFIX_FILE=false
    export CLOUDFIX_USERNAME="<MY_USERNAME>"
    export CLOUDFIX_PASSWORD="<PASSWORD>"
    ```

5. To generate lintings on the cdk code run 
    ```
    cloudfix-linter cdk -reco

    ```
    or 
    To get recommendations in json format run
    ```
    cloudfix-linter cdk -reco --json

    ```

6. Recommendations will be linted on your Cdk Code.
