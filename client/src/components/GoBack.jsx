import React from "react"
import { ReactComponent as ArrowBack } from "../static/images/arrow-back.svg"
import { useNavigate } from "react-router"

export const GoBack = () => {
	const navigate = useNavigate()

	return (
		<div className="back" onClick={() => navigate(-1)}>
			<div className="back__icon">
				<ArrowBack />
			</div>
			<div className="back__text">
				Вернуться назад
			</div>
		</div>
	)
}