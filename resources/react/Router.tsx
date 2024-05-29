import { Route, Routes } from "react-router-dom";
import { Guard } from "./components/layouts/Guard";
import { Main } from "./components/layouts/Main";
import { Sign } from "./components/layouts/Sign";
import { Single } from "./components/layouts/Single";
import { Login } from "./components/views/login/Login";
import { Register } from "./components/views/login/Register";

export const Router = () => {
  return (
    <Routes>
      <Route element={<Guard component={Main} />}>
        <Route path="/" element={<div>index</div>} />
        <Route path="/diaries" element={<div>list</div>} />
      </Route>

      <Route element={<Guard component={Single} />}>
        <Route path="/diary/add" element={<div>add</div>} />
        <Route path="/diary/edit" element={<div>edit</div>} />
      </Route>

      <Route element={<Sign />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      <Route path="*" element={<div>404</div>} />
    </Routes>
  );
};
