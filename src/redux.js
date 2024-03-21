export const reducer = (states, action) => {
  switch (action.type) {
    case 'SET':
      return [
        ...states,
        {
          id: action.formula.id,
          atom: action.formula.atom,
          sub: action.formula.sub
        }
      ];

    case 'RESET':
      return [];
    default:
      return states;
  }
};