import * as React from "react";
import {
    FileField,
    BooleanField,
    FileInput,
    List,
    Datagrid,
    TextField,
    EmailField,
    UrlField,
    useRecordContext,SimpleForm, Edit, TabbedForm, FormTab, BooleanInput, TextInput, NumberInput, Button
} from 'react-admin';
import UploadComponent from './FileUpload';
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import {Upload} from "./Assets";

const BrandStore = (props) => {
    const record = useRecordContext(props);

    var sesid = record[props.source];
    return (
        <div>
            <a href={"http://13.40.79.158/loadstore?token="+sesid}  target="_blank">Open Store</a>
        </div>
    );
}

BrandStore.propTypes = {
    label: PropTypes.string,
    record: PropTypes.object,
    source: PropTypes.string.isRequired,
};

export const UserList = props => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <div>
                <BrandStore source="sesid"></BrandStore>
            </div>
            <TextField source="firstName" />
            <TextField source="lastName" />
            <EmailField source="email" />
            <BooleanField source="setupComplete" />
            <BooleanField source="onboardingComplete" />
            <TextField source="countryCode" />
            <TextField source="company" />
            <TextField source="jobTitle" />
        </Datagrid>
    </List>
);

export const UserEdit = props => {
    return (
        <Edit {...props}>
            <SimpleForm>
                <BooleanInput source="setupComplete" />
                <BooleanInput source="onboardingComplete" />
                <TextInput source="firstName" />
                <TextInput source="lastName" />
                <TextInput source="email" />
                <TextInput source="countryCode" />
                <TextInput source="company" />
                <TextInput source="jobTitle" />
            </SimpleForm>
        </Edit>
    );
}