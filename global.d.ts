// declare global {
//   interface Window {
//     __URQL_DATA__: object
//   }
// }

import JSEncrypt from 'jsencrypt'
// declare global {
//   window.__URQL_DATA__ = object
// }

// interface Window {
//     __URQL_DATA__: object
//     prototype: Window
// }

// declare const window: Window

declare global {
  interface Window {
    JSEncrypt: typeof JSEncrypt
  }
}
// declare const Window: {
//     new (): Window;
//     prototype: Window;
//     __URQL_DATA__: object;
// }

// declare const window: Window

// declare global {
//     interface Window {
//         __URQL_DATA__: object
//     }
// }
