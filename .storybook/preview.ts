import type { Preview } from '@storybook/react-vite'
import '../src/style/index.css'
import "virtual:svg-icons-register";
const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;