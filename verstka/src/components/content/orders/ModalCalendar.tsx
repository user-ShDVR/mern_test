import React, { useState } from "react"
import { Button, Modal } from "antd"
import CalendarForModal from './CalendarForModal';

const ModalCalendar: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleOk = () => {
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Выберите дату
      </Button>
      <Modal
        title="Выберите дату"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={"348px"}
      >
        <CalendarForModal/>
      </Modal>
    </>
  )
}

export default ModalCalendar
