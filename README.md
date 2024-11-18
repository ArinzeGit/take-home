# Take-Home Coding Assignment

## Overview

This repository contains the solution for the coding challenge by SingleDraft. It includes a set of cards with functionality to expand/collapse, delete, and view deleted cards. The states are persisted across page refreshes, and animations are included for smooth transitions.

## Features Implemented

- Expand/Collapse functionality for cards.
- Delete functionality with state persistence.
- Added "Reveal" functionality to display deleted cards.
- State persistence after refresh.
- Animations for smooth transitions.
- "Refresh" functionality for reloading the state.
- **Revert functionality**: Allows users to restore deleted cards back to their original state.

## Coding Choices

- **State Management**: I used Zustand for global state management because it's simple and provides a flexible way to manage the state of expanded and deleted cards. Zustand is ideal for this use case as we need to share the card states across components.
- **Animations**: I implemented animations using Tailwind CSS to keep the codebase lightweight while ensuring smooth transitions when expanding, collapsing, or revealing cards.
- **Reusable Components**: I created a generic `<ToggleButton />` to handle any toggle functionality across the app, promoting reusability and cleaner code.
- **State Persistence**: I ensured the states (expanded and deleted cards) are persisted even after a page refresh by using the global Zustand store, which maintains the state across renders.

## Testing Approach

- I would write **unit tests** for individual components like `<Card />`, `<DeletedCard />`, and `<ToggleButton />` to ensure they behave correctly based on different props and interactions.
- **Integration tests** would be written to ensure the state changes correctly when interacting with the "Delete" and "Expand" buttons and that the animation effects are triggered as expected.
- **End-to-End (E2E) tests** would verify the user flows, including card deletion, expansion, and the revealing of deleted cards.
- I recommend focusing on unit and integration tests first, ensuring core functionalities are tested thoroughly, and then adding E2E tests for end-to-end user experience validation once a testing framework is set up.

## How to Run

1. Clone the repository:
   `git clone https://github.com/ArinzeGit/take-home`
2. Install dependencies:
   `npm install`
3. Start the development server:
   `npm run dev`
4. Open the app in your browser at `http://localhost:5173`

## Additional Information

Feel free to contact me if you have any questions or need further clarification regarding the implementation.
