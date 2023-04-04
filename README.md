# cloudfixLinter-demo-CDK
Demo repository to test cloudfix-linter for cdk


## Steps for demo

1. Install node_modules for the CDK project
    ```
    npm i
    ```
2. Login to aws

3. Specify the region for profile chosen (default is `default`)

4. This CDK project has 2 stacks, deploy them
    ```
    cdk deploy --all
    ```
5. Run the following command to generate reccos
    ```
    python utils/gen_recco.py CfDemoStack CDKDemoStack2
    ```
6. Use mock cloudfix responses
    ```
    export CLOUDFIX_FILE=true
    ```
7. Run Cloudfix linter CLI
    ```
    ./cloudfix-linter-developer cdk reco -j
    ```
    for JSON mode
    OR
    ```
    ./cloudfix-linter-developer cdk reco
    ```
    for interactive mode
