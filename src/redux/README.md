# Redux Setup

This directory contains the Redux setup for the application.

## Structure

- `store.ts`: Configures the Redux store with all reducers
- `hooks.ts`: Custom hooks for accessing the store in components
- `ReduxProvider.tsx`: Provider component that wraps the application
- `slices/`: Directory containing Redux slices
    - `notesSlice.ts`: Notes management slice

## Usage

1. **Creating a new slice**:
    - Create a new file in the `slices/` directory
    - Follow the pattern in `notesSlice.ts`
    - Add the reducer to the `store.ts` file

2. **Using Redux in components**:
    - Import the custom hooks from `hooks.ts`:
        ```typescript
        import { useAppDispatch, useAppSelector } from "../redux/hooks";
        ```
    - Use `useAppSelector` to read from the store
    - Use `useAppDispatch` to dispatch actions

3. **Example**:

    ```typescript
    import { useAppDispatch, useAppSelector } from '../redux/hooks';
    import { addNote } from '../redux/slices/notesSlice';

    const MyComponent = () => {
      const notes = useAppSelector((state) => state.notes.notes);
      const dispatch = useAppDispatch();

      const handleAddNote = () => {
        dispatch(addNote({ title: "New Note", content: "Note content" }));
      };

      return (
        <div>
          <button onClick={handleAddNote}>
            Add Note
          </button>
          {notes.map(note => (
            <div key={note.id}>
              <h3>{note.title}</h3>
              <p>{note.content}</p>
            </div>
          ))}
        </div>
      );
    };
    ```

## Adding New Reducers

1. Create a new slice in the `slices/` directory
2. Import the reducer in `store.ts`
3. Add it to the `reducer` object in the `configureStore` call
