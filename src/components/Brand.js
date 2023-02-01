import * as React from "react";
import {useCallback,useState} from 'react'
import {
    useRecordContext,
    Button,
    SelectInput,
    FormTab,
    TabbedForm,
    Edit,
    BooleanInput,
    SimpleForm,
    BooleanField,
    ImageField,
    TextInput,
    DateInput,
    NumberInput,
    NumberField,
    DateField,
    FileField,
    FileInput,
    List,
    Datagrid,
    TextField,
    EmailField,
    UrlField,ReferenceField,
    Create, ReferenceInput
} from 'react-admin';
import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components'
import { Field } from 'react-final-form';
import PropTypes, {number} from 'prop-types';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export const BrandList = props => {

    return(
        <List {...props}>
            <Datagrid rowClick="edit">
                <TextField source="id" />
                <ReferenceField source="userId" reference="users">
                    <TextField source="company" />
                </ReferenceField>
                <TextField source="logo_cdnId" />
            </Datagrid>
        </List>
    )};