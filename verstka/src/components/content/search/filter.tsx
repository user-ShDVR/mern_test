import React, { Component } from "react"
import { Switch, Button } from "antd"
import FilterSlider from "./filter-slider"
import cls from "./filter.module.scss"

const onChange = (checked: boolean) => {
  console.log(`switch to ${checked}`)
}

const Filter: React.FC = props => {
  return (
    <div className={cls.filter}>
      <h3>Фильтр</h3>
      <h3 className={cls.filter__price}>Цена</h3>
      <FilterSlider />
      <div
        className={cls.filter__other}
        style={{ display: "flex", marginTop: "24px" }}
      >
        <Switch defaultChecked onChange={onChange} />
        <h3 style={{ marginTop: "0px", marginLeft: "8px", fontWeight: "400" }}>
          В наличии
        </h3>
      </div>
      <Button block>Применить</Button>
    </div>
  )
}
export default Filter
