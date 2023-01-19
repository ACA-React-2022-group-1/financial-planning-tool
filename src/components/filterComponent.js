import React from "react"
import { Radio } from 'antd';

export default function FilterComponent ({filterByType, setFilterByType}) {
    const handleChange = (e) => {
        setFilterByType(e.target.value);
    };

    return(
        <div>
            <Radio.Group value={filterByType} onChange={handleChange}>
                <Radio.Button value="all">All</Radio.Button>
                <Radio.Button value="expense">Expense</Radio.Button>
                <Radio.Button value="income">Income</Radio.Button>
            </Radio.Group>  
        </div>
    )
}