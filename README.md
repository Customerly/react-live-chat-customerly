
# React Live Chat from Customerly

Enhance your React application with Customerly's powerful Live Chat system. Leverage advanced features such as real-time user authentication, customized user attributes, and extensive interaction capabilities.

[![NPM Version](https://img.shields.io/npm/v/react-live-chat-customerly.svg)](https://npmjs.com/package/react-live-chat-customerly)
[![Downloads](https://badgen.net/npm/dw/react-live-chat-customerly)](https://npmjs.com/package/react-live-chat-customerly)
[![Bundle Size](https://badgen.net/bundlephobia/minzip/react-live-chat-customerly)](https://bundlephobia.com/result?p=react-live-chat-customerly)

## Features
* Real-time user authentication
* Customizable user attributes for enhanced personalization
* Dynamic interaction with programmable buttons
* Fully compatible with SSR environments like NextJS
* Lightweight with no external dependencies

## Installation

```bash
npm install --save react-live-chat-customerly
# or
yarn add react-live-chat-customerly
# or
pnpm add react-live-chat-customerly
```

## Quickstart

```tsx
import React, { FunctionComponent, useEffect } from 'react';
import { CustomerlyProvider, useCustomerly } from 'react-live-chat-customerly';

const PROJECT_ID = 'YOUR_CUSTOMERLY_PROJECT_ID';

const App: FunctionComponent = () => (
    <CustomerlyProvider appId={PROJECT_ID}>
        <HomePage />
    </CustomerlyProvider>
);

const HomePage: FunctionComponent = () => {
    const { load, open } = useCustomerly();

    // Automatically load the chat when the component mounts
    useEffect(() => {
        load();
    }, []);

    // Button to open the chat interface
    const handleOpenChat = () => {
        open();
    };

    return (
        <button onClick={handleOpenChat}>
            Open Chat
        </button>
    );
};

export default App;
```

## API Reference

### CustomerlyProvider
Sets up the Customerly chat environment.

#### CustomerlyProvider Props

| Prop  | Type    | Description                | Required | Default |
|-------|---------|----------------------------|----------|---------|
| appId | string  | Your Customerly Project ID | Yes      | None    |
| beta  | boolean | Enable the beta version of the messenger | No       | false   |

> ⚠️ Note: Activating the beta flag allows you to try our newest features before their official release. Please be aware that these features are in beta and may be less stable. Your feedback is valuable in helping us improve.

### useCustomerly
Hook to interact with Customerly chat functionalities.

#### Functions

| Function             | Arguments                                    | Description |
|----------------------|----------------------------------------------|-------------|
| load                 | [load options](###load function options)     | Initializes and loads the chat window with user data |
| update               | [update options](###update function options) | Updates the chat window with new user data |
| open                 | None                                         | Opens the chat window |
| close                | None                                         | Closes the chat window |
| show                 | None                                         | Shows the chat window |
| hide                 | None                                         | Hides the chat window |
| event                | `"event_name"`                               | Fires a specific event to track user interaction |
| attribute            | `"key", "value"`                             | Updates or adds a new attribute for the user on the go |
| logout               | None                                         | Logs out the user from the live chat session |
| showNewMessage       | `"message"`                                  | Opens the chat window and displays a pre-populated message |
| sendNewMessage       | `"message"`                                  | Sends a new message from the user |
| [registerCallback](##Callbacks) | CustomerlyCallback                           | Allows or prevents the chat from automatically detecting and adapting to the user's locale  | No       | true    |

### Load function options

You can customize the appearance and behavior of the AI Chatbot by passing different information to the load function.

| Option                                                                | Type    | Description                                                                                 | Required | Default |
|-----------------------------------------------------------------------|---------|---------------------------------------------------------------------------------------------|----------|---------|
| user_id                                                               | `string`  | Unique identifier for the user                                                              | No       | None    |
| email                                                                 | `string`  | User's email address                                                                        | No       | None    |
| name                                                                  | `string`  | User's full name                                                                            | No       | None    |
| [attributes](####User authentication and custom attributes Structure) | `object`  | Customisable user details                                                                   | No       | None    |
| [company](####Company Object Structure)                               | `object`  | Company details associated with the user                                                    | No       | None    |
| accentColor                                                           | `string`  | HEX code to customize the main color of the live chat interface                             | No       | None    |
| contrastColor                                                         | `string`  | HEX code to customize the contrast color of the live chat interface                         | No       | None    |
| position                                                              | `object`  | Defines the position of the chat bubble on desktop and mobile (`bottom` and `side` offsets) | No       | `{desktop: {bottom: 0, side: 0}, mobile: {bottom: 0, side: 0}}` |
| visible                                                               | `boolean` | Controls the visibility of the live chat on all devices                                     | No       | `true`    |
| visibleOnMobile                                                       | `boolean` | Specifically controls the visibility of the live chat on mobile devices                     | No       | `true`    |
| attachmentsAvailable                                                  | `boolean` | Enables or disables the attachment feature in the chat interface                            | No       | `true`    |
| autodetectLocale                                                      | `boolean` | Allows or prevents the chat from automatically detecting and adapting to the user's locale  | No       | `true`    |

#### User authentication and custom attributes Structure

```tsx
import React, { FunctionComponent, useEffect } from 'react';
import { CustomerlyProvider, useCustomerly } from 'react-live-chat-customerly';

const PROJECT_ID = 'YOUR_CUSTOMERLY_PROJECT_ID';

const App: FunctionComponent = () => (
    <CustomerlyProvider appId={PROJECT_ID}>
        <UserChatComponent />
    </CustomerlyProvider>
);

const UserChatComponent: FunctionComponent = () => {
    const { load } = useCustomerly();

    // Effect to load the chat with user details when the component mounts
    useEffect(() => {
        load({
            user_id: "123456", // Unique identifier for the user
            name: "John Doe",  // User's full name
            email: "john.doe@example.com", // User's email address
            attributes: { // Custom attributes for the user
                signup_date: 1384902000,  // Example attribute: user's signup date (Add dates as Unix timestamp)
                plan_level: "premium",    // Example attribute: user's subscription plan
                age: 30                   // Example attribute: user's age
            }
        });
    }, []);

    return (
        <div>
            <h1>Welcome to Customerly Live Chat!</h1>
            <p>Your chat is ready. Click the chat icon to start interacting with us.</p>
        </div>
    );
};

export default App;
```

#### Company Object Structure

```tsx
import React, { FunctionComponent, useEffect } from 'react';
import { CustomerlyProvider, useCustomerly } from 'react-live-chat-customerly';

const PROJECT_ID = 'YOUR_CUSTOMERLY_PROJECT_ID';

const App: FunctionComponent = () => (
    <CustomerlyProvider appId={PROJECT_ID}>
        <ChatComponent />
    </CustomerlyProvider>
);

const ChatComponent: FunctionComponent = () => {
    const { load } = useCustomerly();

    // Load function with user and company details
    useEffect(() => {
        load({
            user_id: "USER_ID",  // Optionally pass user ID if available
            email: "USER_EMAIL", // Replace with actual user email
            name: "USER NAME",   // Replace with actual user name
            company: {
                company_id: "COMPANY_ID",
                name: "ACME",
                address: "Ground Floor, 71 Lower Baggot Street",
                city: "Dublin",
                employees: 10,
                admin_url: "https://www.company.com/admin/companyID",
                sub_name: "Pro",
                sub_period: "Yearly",
                sub_state: "Active",
                sub_amount: 1188,
                last_payment_amount: 1188,
                total_revenues: 5940,
                domain: "company.com"
            }
        });
    }, []);

    return (
        <div>
            <h1>Welcome to Our Chat!</h1>
            <p>This setup pre-loads the chat with user and company information.</p>
        </div>
    );
};

export default App;
```

### Update function options

The update function is a critical tool within the Customerly Live Chat SDK, designed to refresh and sync user data and configurations in real-time. This function is particularly useful in single-page applications (SPAs) where user contexts and states can change without a full page reload.

To ensure that the user information displayed within the live chat remains accurate and current.
When to Use:
- Typically, you should invoke the update function when significant user information changes, such as after editing a profile, changing user settings, or upon user login/logout actions.
- Route Changes: In SPAs, where route changes do not reload the entire application, it’s crucial to manually invoke the update function to refresh the chat environment.

```tsx
import React, { FunctionComponent, useEffect, useContext } from 'react';
import { useCustomerly } from 'react-live-chat-customerly';
import { useLocation } from 'react-router-dom';

const UserProfilePage: FunctionComponent = () => {
  const { update } = useCustomerly();
  const location = useLocation(); 

  const userDetails = {
    email: 'john.doe@example.com',
    name: 'John Doe',
    attributes: {
      membershipLevel: 'Gold',
    }
  };

  useEffect(() => {
    // Triggering the update function to refresh chat settings and surveys
    update();
  }, [location.pathname]); // Dependency on location.pathname to re-run on route changes

  useEffect(() => {
    update({
      email: userDetails.email,
      name: userDetails.name,
      attributes: userDetails.attributes
    });
  }, [userDetails]); // Dependency on userDetails to re-run on user data changes
  
  return (
    <div>
      <h1>User Profile</h1>
      <p>Welcome, {userDetails.name}! Your membership level is {userDetails.customAttributes.membershipLevel}.</p>
    </div>
  );
};

export default UserProfilePage;
```

## Callbacks
| Callback Function              | Description                                                                                         | Returns                                      |
|--------------------------------|-----------------------------------------------------------------------------------------------------|---------------------------------------------|
| `onLeadGenerated`              | Triggered when a new conversation is initiated, signaling a potential lead generation.              | `email` (the lead's email if provided)      |
| `onChatOpened`                 | Triggered when the chat window is opened by the client.                                             | None                                        |
| `onChatClosed`                 | Triggered when the chat window is closed by the client.                                             | None                                        |
| `onNewConversation`            | Occurs when a new conversation starts, useful for analytics tracking.                               | `message`, `attachments`                    |
| `onProfilingQuestionAnswered`  | Triggered when a profiling question is answered, capturing the response details.                    | `attribute`, `value`                        |
| `onProfilingQuestionAsked`     | Activated when a profiling question is presented to the visitor.                                    | `attribute` (the related question asked)   |
| `onRealtimeVideoAnswered`      | Fired when a Realtime Video Call is answered by the client.                                         | None                                        |
| `onRealtimeVideoRejected`      | Fired when a Realtime Video Call is rejected by the client.                                         | None                                        |
| `onTriggerFired`               | Triggered when a chat trigger message is received by the customer.                                  | `triggerId` (ID of the trigger fired)       |
| `onHelpCenterArticleOpened`    | Triggered when a client opens a Help Center Article within the live chat widget.                    | `article` (detailed attributes of the article) |

```tsx
import React, { FunctionComponent, useEffect } from 'react';
import { CustomerlyProvider, useCustomerly } from 'react-live-chat-customerly';

const PROJECT_ID = 'YOUR_CUSTOMERLY_PROJECT_ID';

const App: FunctionComponent = () => (
  <CustomerlyProvider appId={PROJECT_ID}>
    <LeadGenChatComponent/>
  </CustomerlyProvider>
);

const LeadGenChatComponent: FunctionComponent = () => {
  const { registerCallback, load } = useCustomerly();

  useEffect(() => {
    load();

    // Define the callback function for a new lead generation
    const onLeadGenerated = (email: string) => {
      // Here you can add the logic to handle the new lead, such as
      // sending the data to your analytics tool
    };

    // Register the callback
    registerCallback({
      type: 'onLeadGenerated',
      function: onLeadGenerated
    });
  }, []);

  // Render UI here
  return <div>Chat with us and become a lead!</div>;
};

export default App;
```

## Example Playground

This is a basic playground to try the Customerly messenger features and custom implementation.

```tsx
import React, { FunctionComponent } from 'react';
import { CustomerlyProvider, useCustomerly } from 'react-live-chat-customerly';

const PROJECT_ID = 'YOUR_CUSTOMERLY_PROJECT_ID';

const TestChatFunctionsPage: FunctionComponent = () => {
    const {
        load,
        update,
        open,
        close,
        show,
        hide,
        event,
        attribute,
        logout,
        showNewMessage,
        sendNewMessage,
        registerCallback
    } = useCustomerly();

    useEffect(() => {
        load({
            user_id: "test_user_id",
            email: "test@example.com",
            name: "Test User",
            attributes: {
                role: "tester"
            },
            company: {
                company_id: "test_company_id",
                name: "Test Company"
            }
        });

        // Define the callback function for a new conversation started
        const onNewConversation = (message: string) => {
            console.log('New conversation started:', message);
        };

        // Register the callback
        registerCallback({
            type: 'onNewConversation',
            function: onNewConversation
        });
    }, []);


    const testUpdate = () => {
        update({
            user_id: "test_user_id",
            email: "test@example.com",
            name: "Test User Updated",
            attributes: {
                role: "tester",
                plan: "Enterprise",
            },
            company: {
                company_id: "test_company_id",
                name: "Test Company"
            }
        });
    };


    return (
        <div>
            <h1>Test Customerly Live Chat Functions</h1>
            <button onClick={open}>Open Chat</button>
            <button onClick={close}>Close Chat</button>
            <button onClick={show}>Show Chat</button>
            <button onClick={hide}>Hide Chat</button>
            <button onClick={() => event("test_event")}>Fire Event</button>
            <button onClick={() => attribute("test_key", "test_value")}>Update Attribute</button>
            <button onClick={logout}>Logout User</button>
            <button onClick={() => showNewMessage("Hello, I'm interested in upgrading.")}>Show New Message</button>
            <button onClick={() => sendNewMessage("Hello, I'm interested in upgrading.")}>Send New Message</button>
            <button onClick={testUpdate}>Test Update</button>
        </div>
    );
};

const App: FunctionComponent = () => (
    <CustomerlyProvider appId={PROJECT_ID}>
        <TestChatFunctionsPage />
    </CustomerlyProvider>
);

export default App;
```

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please [create an issue](https://github.com/Customerly/react-live-chat-customerly/issues) or submit a pull request.

