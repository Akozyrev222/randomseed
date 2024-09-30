import {useState} from "react";
import {useForm} from "react-hook-form"
import axios from "axios";


export const useData = () => {
    const [loading, setLoading] = useState(false)
    const [users, setUsers] = useState([])
    console.log(users)

    const {
        control,
        handleSubmit,
        setValue,
        formState: {defaultValues},
    } = useForm({
        defaultValues: {
            region: {key: '1', label: "Romania", locale: 'RO'},
            error: 0,
            page: 1
        },
    })

    const onSubmit = async (data) => {
        console.log(data)
        const response = await axios({
            url: `http://localhost:3000/params?page=${data.page}`,
            method: 'post',
            data: {...data},
        })
        if (response.data) {
            setUsers([...users, ...response.data.users])
            setValue('page', response.data.page + 1)
        }
    }

    const columns = [
        {
            title: 'number',
            dataIndex: 'number',
        },
        {
            title: 'id',
            dataIndex: 'id',
        },
        {
            title: 'phone',
            dataIndex: 'phone',
        },
        {
            title: 'fullName',
            dataIndex: 'fullName',
        },
        {
            title: 'address',
            dataIndex: 'address',
        },
    ];
    const items = [
        {
            key: '1',
            label: 'Romania',
            locale: 'RO'
        },
        {
            key: '2',
            label: 'Poland',
            locale: 'PL'
        },
        {
            key: '3',
            label: 'German',
            locale: 'DE'
        },
    ];


    return {
        loading,
        users,
        columns,
        items,
        control,
        onSubmit,
        handleSubmit,
        defaultValues
    }
}