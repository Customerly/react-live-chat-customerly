# React Live Chat from Customerly

Add the most powerful [Live Chat](https://www.customerly.io/?utm_source=github&utm_medium=README&utm_campaign=ReactSDK) to your React app.

## ⚙️ Install

### Using npm

Run `npm install --save react-live-chat-customerly`

### Using yarn

Run `yarn add react-live-chat-customerly`

## 🚀 How to use

To integrate Customerly Livechat to your React app, you need to have an account with Customerly. [Sign up here](https://www.customerly.io/?utm_source=github&utm_medium=README&utm_campaign=ReactSDK).

```javascript
import {CustomerlyProvider} from "react-live-chat-customerly";

ReactDOM.render(
    <CustomerlyProvider appId={"YOUR_APP_ID"}>
        <App/>
    </CustomerlyProvider>,
    document.getElementById("root")
);
```

And then, you can use the `useCustomerly` hook to load the messenger, and interact with it.

```javascript
const App: FunctionComponent = () => {
    const { load } = useCustomerly();

    useEffect(() => {
        load({ ... })
    }, []);
    
    return (
        <Things />
    )
}
```

### useCustomerly

This hook exposes all the available methods mentioned in the documentation, [check it out](https://docs.customerly.io/live-chat/install-live-chat?utm_source=github&utm_medium=README&utm_campaign=ReactSDK).

 - `load` - The entry point of Customerly, it loads the messenger in the webpage
 - `update` - Same as load, but to refresh the messenger (e.g. after a sign in you might want to authenticate the user)
 - `open` - Open programmatically the messenger
 - `close` - Close programmatically the messenger
 - `show` - Show programmatically the messenger
 - `hide` - Hide programmatically the messenger
 - `event` - Track an event for the user in the current session
 - `attribute` - Track a property for the user in the current session
 - `sendNewMessage` - Send a new message
 - `showNewMessage` - Open and prefill the messenger with the specified message
 - `registerCallback` - Register a callback ([see available callbacks](https://docs.customerly.io/live-chat/how-to-add-live-chat-callbacks?utm_source=github&utm_medium=README&utm_campaign=ReactSDK)) fired by the messenger during the lifecycle

## 🙋 Contributing
If you have improvements that you'd like to see, or encounter any bugs, feel free to [create an issue](https://github.com/Customerly/gatsby-plugin-customerly-chat/issues). Alternatively, please open a PR, and make sure that the new code is properly tested and all the steps.

We follow the [Conventional Commits specification](https://www.conventionalcommits.org/en/v1.0.0/).

