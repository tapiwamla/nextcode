import React, { useEffect, useRef, useState } from 'react';

import Avatar from 'react-avatar';

import CodeMirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/dracula.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/closebrackets';

import LandingPage from './pages/landing';
import EditorPage from './pages/editor';

import ACTIONS from './functions/actions';

import Client from './components/client';
import Editor from './components/editor';
import { initSocket } from './functions/socket';
import { toast, Toaster} from 'react-hot-toast';
import { useLocation, useNavigate, Navigate, useParams } from 'react-router-dom';
import { v4 as uuidV4 } from 'uuid';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ReactDOM from 'react-dom';

export { Avatar };
export { useEffect, useRef, useState, CodeMirror };
export { LandingPage, EditorPage };
export { ACTIONS };
export { Client, Editor };
export { initSocket };
export { toast, Toaster};
export { useLocation, useNavigate, Navigate, useParams };
export { uuidV4 };
export { BrowserRouter, Routes, Route };
export { ReactDOM };