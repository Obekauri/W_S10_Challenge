import React, { useState } from 'react'
import { useGetUsersQuery } from '../state/usersApi'

export default function OrderList() {
  const { data } = useGetUsersQuery()
  const [activeFilter, setActiveFilter] = useState('All')

  const onClick = (event) => {
    const size = event.target.innerText
    setActiveFilter(size)
  }

  const orders = data ? Object.entries(data) : []

  const filteredOrders = activeFilter === 'All'
    ? orders
    : orders.filter(([key, order]) => order.size === activeFilter)

  return (
    <div id="orderList">
      <h2>Pizza Orders</h2>
      <ol>
        {
          filteredOrders.map((item) => {
            return (
              <li key={item[1].id}>
                <div>
                  {item[1].customer} ordered a size {item[1].size} with {item[1]?.toppings?.length > 0 ? item[1].toppings.length : 'no'} toppings
                </div>
              </li>
            )
          })
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
                onClick={onClick}>
                {size}
              </button>
            )
          })
        }
      </div>
    </div>
  )
}
