import { Route, Routes } from "react-router-dom";
import { Guard } from "./components/layouts/Guard";
import { Main } from "./components/layouts/Main";
import { Sign } from "./components/layouts/Sign";
import { Single } from "./components/layouts/Single";
import { DiaryAdd } from "./components/views/diary/Add";
import { DiaryEdit } from "./components/views/diary/Edit";
import { DiaryList } from "./components/views/diary/List";
import { DiarySingle } from "./components/views/diary/Single";
import { Home } from "./components/views/home/Home";
import { Login } from "./components/views/sign/Login";
import { Register } from "./components/views/sign/Register";

export const Router = () => {
  return (
    <Routes>
      <Route element={<Guard component={Main} />}>
        <Route path="/" element={<Home />} />
        <Route path="/diaries" element={<DiaryList />} />
      </Route>

      <Route element={<Guard component={Single} />}>
        <Route path="/diary/:id" element={<DiarySingle />} />
        <Route path="/diary/add" element={<DiaryAdd />} />
        <Route path="/diary/edit/:id" element={<DiaryEdit />} />
      </Route>

      <Route element={<Sign />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      <Route path="*" element={<div>404</div>} />
    </Routes>
  );
};
