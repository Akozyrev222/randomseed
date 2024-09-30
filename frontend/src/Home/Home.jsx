import React, {useState} from "react";
import {useData} from "./useData.js";
import {Dropdown, InputNumber, Slider, Spin, Table, Button} from "antd";
import Shuffle from "../assets/shuffle.svg";
import {Controller} from "react-hook-form";


const Home = () => {

    const {
        loading,
        users,
        columns,
        items,
        control,
        onSubmit,
        handleSubmit,
    } = useData()

    return (
        <div>
            <nav className="navbar navbar-light bg-light flex-row justify-content-between p-2">
                <Controller
                    name="region"
                    control={control}
                    render={({field: {onChange, value}}) => {
                        return (
                            <div
                                className='d-flex w-25 flex-row justify-content-center align-items-center'>
                                <div className='me-4'>Region:</div>
                                <Dropdown menu={
                                    {
                                        items,
                                        onClick: (e) => {
                                            const key = e.key
                                            console.log(items.find(e => e.key === key))
                                            onChange(items.find(e => e.key === key))
                                        },
                                    }
                                }
                                          placement="bottom">
                                    <Button>{value.label}</Button>
                                </Dropdown>
                            </div>
                        )
                    }}
                />
                <Controller
                    name="error"
                    control={control}
                    render={({field: {onChange, value}}) => {
                        return (
                            <div className='d-flex w-25 flex-row justify-content-between align-items-center'>
                                <div className='me-4'>Errors</div>
                                <Slider
                                    min={0}
                                    max={1000}
                                    className='w-50'
                                    onChange={onChange}
                                    value={value}
                                />
                                <InputNumber
                                    min={0}
                                    max={1000}
                                    style={{
                                        margin: '0 16px',
                                    }}
                                    value={value}
                                    onChange={onChange}
                                />
                            </div>
                        )
                    }}
                />
                <Controller
                    name="seed"
                    control={control}
                    render={({field: {onChange, value}}) => {
                        return (
                            <div className='d-flex align-items-center'>
                                <div className='me-2'>Seed:</div>
                                <InputNumber
                                    className='w-50'
                                    placeholder="enter seed"
                                    onChange={onChange}
                                    value={value}
                                />
                                <Button onClick={handleSubmit(onSubmit)} className='ms-2'>
                                    <img className='icon' src={Shuffle} alt='shuffle'/>
                                </Button>
                            </div>
                        )
                    }}
                />
                <div className='d-flex align-items-center'>
                    <Button className='ms-2'>
                        Export
                    </Button>
                </div>
            </nav>
            <div className='container mt-4'>
                <Spin tip="Loading" spinning={loading} size="large">
                    <Table
                        pagination={false}
                        rowKey="id"
                        columns={columns}
                        scroll={{ x: "max-content" }}
                        dataSource={users}
                    />
                </Spin>
            </div>
        </div>
    )
}
export default Home