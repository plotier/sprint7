import { BrowserRouter, Route, Routes} from 'react-router-dom';
import { Home } from './Home';
import { Welcome } from './Welcome';

export default () => (
    <BrowserRouter>
        <Routes>   
            <Route path="/" element={<Welcome/>} />
            <Route path="/home/" element={<Home/>} />
            <Route path="*" element={<div>404</div> } />
        </Routes>
    </BrowserRouter>
);