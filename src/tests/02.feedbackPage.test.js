import React from "react";
import { screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";
import App from "../App";
import Feedback from '../pages/Feedback';