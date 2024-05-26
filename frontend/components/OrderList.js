import React, { useState } from 'react'
import { useGetUsersQuery } from '../state/usersApi'

export default function OrderList() {
  const { data: orders } = useGetUsersQuery()
  const [activeFilter, setActiveFilter] = useState('All')

  const handleFilterClick = (size) => {
    setActiveFilter(size)
  }

  const filteredOrders = activeFilter === 'All'
    ? orders
    : orders?.filter(order => order.size === activeFilter)

  return (
    <div id="orderList">
      <h2>Pizza Orders</h2>
      <ol>
        {
          filteredOrders?.map(item => (
            <li key={item.id}>
              <div>
                {item.customer} ordered a size {item.size} with {item.toppings ? item.toppings.length : 'no'} toppings
              </div>
            </li>
          ))
        }
      </ol>
      <div id="sizeFilters">
        Filter by size:
        {
          ['All', 'S', 'M', 'L'].map(size => {
            const className = `button-filter${size === activeFilter ? ' active' : ''}`
            return (
              <button
                data-testid={`filterBtn${size}`}
                className={className}
                key={size}
                onClick={() => handleFilterClick(size)}>
                {size}
              </button>
            )
          })
        }
      </div>
    </div>
  )
}

