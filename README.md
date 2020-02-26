# Marvel Heroes
Creation a React Native Application using the Marvel Developer portal.

# Solution Design
![Alt text](solution_design/design.png?raw=true "Design")
## Demo:
![Alt text](solution_design/demoapp.gif?raw=true "Demo")

# Running the application - yarn (moved on from npm)
```javascript
git clone https://github.com/MarshalPaterson/MarvelHeroes.git
yarn
yarn build
yarn start
```

## Visual Studio Code launch settings
```javascript
{
    // Use IntelliSense to learn about possible attributes.
    // Hover to view descriptions of existing attributes.
    // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
    "version": "0.2.0",
    "configurations": [
        {
            "name": "Debug iOS",
            "cwd": "${workspaceFolder}",
            "type": "reactnative",
            "request": "launch",
            "platform": "ios"
        },
        {
            "name": "Debug Android",
            "cwd": "${workspaceFolder}",
            "type": "reactnative",
            "request": "launch",
            "platform": "android"
        },
        {
            "type": "node",
            "request": "launch",
            "name": "Launch Program",
            "skipFiles": [
                "<node_internals>/**"
            ],
            "program": "${workspaceFolder}/start"
        }
    ]
}
```
# State Management - Mobx Vs Redux Vs State and Props
Small application handled by State and Props. No Mobx and no Redux.

# Unit Tests
```javascript
yarn test
```
Unit tests have been setup and some have been added, though better covered is needed.

