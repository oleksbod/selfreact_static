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
    UrlField,
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
import axios from "axios";

const LatLngInput = () => {
    const cdn = styled.div`
text-align: left;
      displat:flex;
      flex-direction: column;
      width:30em;
      justify-content:space-between;
      gap:100px;
    `

    return(
        <cdn>
        <Field name="lat" component="input" type="number" placeholder="latitude" />
        <Field name="lng" component="input" type="number" placeholder="longitude" />
        <Field name="lng" component="input" type="number" placeholder="longitude" />
        </cdn>

)};
export default LatLngInput;


const useStyles = makeStyles({
    comment: {
        maxWidth: '20em',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    },
    price: { width: '7em' },
    width: { width: '14em' },
    first_name: { display: 'inline-block' },
    last_name: { display: 'inline-block', marginLeft: 32 },
    success:{
        backgroundColor:'green'
    },
    fail:{
        backgroundColor:'red'
    },
    typical:
        {
            backgroundColor:'transparent'
        },

    tab: {
        maxWidth: '20em',
    },
});

const CDNFileId = (props) => {
    let val = 1;
    const record = useRecordContext(props);

    var id = record[props.source];
    props.setActive(id);
    console.log(props.id + "_" +id) ;
    return (
        <div>

        </div>
    );
}

const ImgFileId = (props) => {
    const record = useRecordContext(props);

    var id = record[props.source];
    console.log(props.id + "_" +id) ;
    return (
        <div>
            <img src={  "https://selfservetest-api.azurewebsites.net/cdn/serve/"+id} title="" style={{maxHeight:'50px'}} />
        </div>
    );
}

ImgFileId.propTypes = {
    label: PropTypes.string,
    record: PropTypes.object,
    source: PropTypes.string.isRequired,
};

CDNFileId.propTypes = {
    label: PropTypes.string,
    record: PropTypes.object,
    source: PropTypes.string.isRequired,
};

function mySubmitFunction(e) {
    e.preventDefault();
    return false;
}

export const AssetList = props => {

    return(
    <List {...props}>
        <Datagrid rowClick="edit">
            <div>
                <ImgFileId source="cdnId_thumbnail"></ImgFileId>
                  </div>
            <TextField source="title" />
            <NumberField source="price" />
            <TextField source="shortDescription" />
            <BooleanField source="isActive" title={"Active"}/>
        </Datagrid>
    </List>
)};

export const Upload = (fileIdx, onSuccess, onFail)=>
{
    let photo = document.getElementById("file0").files[0];
    let formData = new FormData();
  console.log(fileIdx);


    formData.append("photo", photo);
    /*fetch(  '/cdn/update/'+ fileIdx, {method: "POST", body: formData}).then((response) => {
        if (response.ok)
        {
            onSuccess();
        }
        else {
            onFail();
        }
            }).catch((error) => {
        onFail();
    });*/
   //https://localhost:5001/
    //
    const options = {
        method: 'POST',
        url: 'https://selfservetest-api.azurewebsites.net/cdn/update/' + fileIdx,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" }
    };

    axios.request(options).then(function (response) {
        onSuccess();
        console.log(response.data);
    }).catch(function (error) {
        onFail();
        console.error(error);
    });
}


export const AssetsCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="title"/>
            <NumberInput source="price"/>
            <TextInput source="shortDescription"/>
            <TextInput multiline source="description"/>
        </SimpleForm>
    </Create>
);

    export const AssetEdit = props => {
        const classes = useStyles();
        let idFileX = [4];
        const [tselection, setSelection] = React.useState('');

        const handleChange = (event) => {
            setSelection(event.target.value);
        };

        return (
            <Edit {...props}>
                <TabbedForm>
                    <FormTab label={"Info"}
                             contentClassName={classes.tab}
                    >
                        <BooleanInput source="isActive"/>
                        <TextInput source="title"/>
                        <NumberInput source="price"/>
                        <TextInput source="shortDescription"/>
                        <TextInput multiline source="description"/>
                    </FormTab>
                    <FormTab label={"CDN Files"}>

                        <CDNFileId  source="cdnId_gltf" setActive={(x) =>{idFileX[0] = x;}}></CDNFileId>
                        <CDNFileId  source="cdnId_thumbnail" setActive={(x) =>{idFileX[1] = x;}}></CDNFileId>
                        <CDNFileId  source="cdnId_detail" setActive={(x) =>{idFileX[2] = x;}}></CDNFileId>
                        <CDNFileId  source="cdnId_detail1" setActive={(x) =>{idFileX[3] = x;}}></CDNFileId>
                        <span>
  <Box sx={{ minWidth: 120 }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">CDN File Tag</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={tselection}
                                    label="CDN File Tag"
                                    onChange={handleChange}
                                >
                                    <MenuItem value={0}>GLTF Asset</MenuItem>
                                    <MenuItem value={1}>Thumbnail</MenuItem>
                                    <MenuItem value={2}>Detail</MenuItem>
                                    <MenuItem value={3}>Detail1</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                        </span>

                        <p>&nbsp;</p>
                        <input type={'file'} id={'file0'}/>
<Button label={"Upload"} onClick={(x) =>{
    console.log("clicked");
    document.getElementById("file0").className = classes.typical;
    Upload(idFileX[tselection]
    ,()=>{document.getElementById("file0").className = classes.success;}
    ,()=>{document.getElementById("file0").className = classes.fail;}
    );
}}></Button>

                    </FormTab>
                </TabbedForm>
            </Edit>
        );
    }

