React Notes.
library -> a collection of written code just use them by importing the import steps.

Events:
Browser will create the events.
React.ChangeEvent → tells us this object represents a change event
HTMLInputElement → tells us the element involved is an HTML <input>
TypeScript need to know that event is a React.ChangeEvent<HTMLInputElement>

-> Dom and Bom
DOcument object model will handle the all events and UI.
Important part i.e browser creates the event and react event will handles with js -library. React- re renders and dom will update.

    [OR]

React will receive the DOM events through the DOM, and React event handlers will handle and update the DOM.

-> onChange() React prop
onChange is a React prop that expects a callback function. We give our function to onChange, and React will call that function later when a change event occurs on the element.

-> Based on the browser event the react handler will have the diff handlers.

Hookssss :
useState<{ ... }>() → tells React/TypeScript what kind of data this state is meant to hold.

-> Cors Origin
the browser will not allowed to one origin to another origin (ports).THere are 3 types where.

1.simple req: it have the "CRUD" operatios
2.Preflight options:it will send an http options req to determin whether the acutal req went safe ? or not ?
3.Actual Requests: it will carry the payload after the "Preflight option " check
The browser's CORS mechanism checks specific CORS-related headers and request information to enforce the cross-origin policy.
Browser mechanisam is the cors and it will read the http headers to cross-origin access decision .

code:

origin
methods,
allowedHeaders -Which request headers are permitted?
preflight

here
headers: {
'Content-Type': 'application/json',
},
content-type is the headers
application/json is the value
