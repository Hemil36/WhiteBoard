/* eslint-disable no-unused-vars */
"use client"
import qs from "query-string"
import { Search } from "lucide-react"
import { ChangeEvent, useEffect, useState } from "react"
import { Input } from "../../components/ui/input"
import { useDebounceValue } from 'usehooks-ts'
import { Navigate } from "react-router-dom"
import { useNavigate } from 'react-router-dom';
import { useDebounce } from 'use-debounce';
import {debounce} from 'lodash'

export const SearchInput = () => {
    const [value1, setValue1] = useState("");
    const navigate = useNavigate();

    const debouncedSearch = debounce((searchTerm) => {
        // Perform the search or API call with searchTerm
        const query = qs.stringifyUrl({
            url: "/",
            query: { search: searchTerm }
        }, {
            skipEmptyString: true,
            skipNull: true,
        }

        );
        console.log(query);
        navigate(query);

      }, 500);

    const handleChange = (e) => {
        setValue1(e.target.value);
        debouncedSearch(e.target.value);

    }

    
    return (
        <div className=" w-full relative">
            <Search className=" absolute top-1/3 left-3 transform  text-muted-foreground h-4 w-4" />
            <Input placeholder="Search boards" className="w-full  pl-9 max-w-[516px]"
                onChange={handleChange}
                value={value1}
            />
        </div>
    )
}