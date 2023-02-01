import React, {Component} from 'react'
import { Admin,Resource,ListGuesser,EditGuesser } from 'react-admin';
import {UserEdit, UserList} from "../components/UserList";
import {PostList, PostEdit, PostCreate} from "../components/PostList";

import WebAssetIcon from '@material-ui/icons/WebAsset';
import PostIcon from '@material-ui/icons/Book';
import UserIcon from '@material-ui/icons/Group';
import Dashboard from "../components/Dashboard";
import authProvider from "../api/authProvider";
import dataProvider from "../api/dataProvider";
import {AssetEdit, AssetList, AssetsCreate} from "../components/Assets";
import {BrandList} from "../components/Brand";

class AdminRoute extends Component {
    constructor() {
        super();
        this.state = {
            name: "React",
        };

        process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    }

    state = {
        email: "",
        password: ""
    };

    handleChange = e => {
        this.setState({ [e.currentTarget.id]: e.currentTarget.value });
    };

    render() {


        return (
            <div style={{'overflowY':'scroll'}}>
                <Admin dashboard={Dashboard} authProvider={authProvider} dataProvider={dataProvider} >
                    <Resource name="users" list={UserList}  edit = {UserEdit} icon={UserIcon}/>
                    <Resource name="assets" list={AssetList} edit = {AssetEdit} create={AssetsCreate} icon={WebAssetIcon}/>
                </Admin>
            </div>

        )
    }
}

export default AdminRoute