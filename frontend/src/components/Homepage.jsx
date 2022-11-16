import { Box, Stack } from '@mui/material';
import Sidebar from './Sidebar';
import AllProducts from './AllProducts';
import Rightbar from './Rightbar';

const Homepage = () => {
  return (
    <Box>
      <Stack direction="row" spacing={2} justifyContent="space-between">
        <Sidebar />
        <AllProducts />
        <Rightbar />
      </Stack>
    </Box>
  );
};

export default Homepage;
