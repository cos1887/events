import React from 'react';
import { Link } from 'react-router-dom'
import { getCategoryIcon } from '../../helpers/categoryHelper'

function CategoryItem(props) {
    let category = props.category; 
    let iconCategory = getCategoryIcon(category) 
    let classIconCategory =`${iconCategory} icon`; 
    let locationCategory=  `/categoria/${category}`;
    return (
        <div className="meta">
            <i className={classIconCategory}></i>
            <span> Categoria: &nbsp; 
                <Link 
                    to={{pathname: locationCategory, query: {iconCategory: iconCategory }}}>
                        {category}
                </Link>&nbsp;  
            </span>
        </div>
    )
}


export default CategoryItem;