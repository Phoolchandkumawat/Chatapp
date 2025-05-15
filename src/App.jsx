import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./providers/ThemeProvider";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import LandingPage from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CheckUser from "./CheckUser/Checkuser";
import {Store} from './Store/Store'
import { Provider } from "react-redux";
import Loading from "./components/Loading";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light">
      <Provider store={Store}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<CheckUser details="userPage"><Index/></CheckUser>}/>
              <Route path="*" element={<NotFound />} />
              <Route path="/home" element={<CheckUser><LandingPage/></CheckUser>}/>
              <Route path="/login" element={<CheckUser><Login/></CheckUser>} />
              <Route path="/signup" element={<CheckUser><Signup/></CheckUser>} />
              <Route path="/loading" element={<Loading/>}/>
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
        </Provider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
