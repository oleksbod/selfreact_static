import * as React from "react";
import { List,FileInput,FileField,Datagrid, TextField, ReferenceField,EditButton,Create,Edit,SimpleForm,ReferenceInput,TextInput,SelectInput} from 'react-admin';

const postFilters = [
    <TextInput source="q" label="Search" alwaysOn />,
    <ReferenceInput source="userId" label="User" reference="users" allowEmpty>
        <SelectInput optionText="name" />
    </ReferenceInput>,
];

export const PostList = props => (
    <List filters={postFilters} {...props}>
        <Datagrid >
            <TextField disabled source="id" />
            <ReferenceField source="userId" reference="users">
                <TextField source="lastName" />
            </ReferenceField>
            <TextField source="id" />
            <TextField source="title" />
            <TextField source="body" />

        </Datagrid>
    </List>
);

const PostTitle = ({ record }) => {
        return <span>Post {record ? `"${record.title}"` : ''}</span>;
    };


export const PostEdit = props => (
    <Edit title={<PostTitle/>} {...props}>
        <SimpleForm>
            <ReferenceInput source="userId" reference="users">
                <SelectInput optionText="email" />
            </ReferenceInput>
            <TextInput source="name" />
            <TextInput source="title" />
            <TextInput multiline source="body" />
        </SimpleForm>
    </Edit>
);

export const PostCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <ReferenceInput source="userId" reference="users">
                <SelectInput optionText="name" />
            </ReferenceInput>
            <TextInput source="name" />
            <TextInput source="title" />
            <TextInput multiline source="body" />
            <FileInput source="files" label="Related files" accept="*">
                <FileField source="src" title="title" />
            </FileInput>
        </SimpleForm>
    </Create>
);