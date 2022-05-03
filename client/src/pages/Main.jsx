import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import { imgSrc } from "../helpers"
import { NavLink } from "react-router-dom"
import { useDispatch } from "react-redux"
import { getArts } from "../actions/art"
import { Loader } from "../components/Loader"

export const Main = () => {
	const { arts } = useSelector(state => state.arts)
	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(getArts())
	}, [])
	return (
		<div className="arts">
			<div className="container">
				{arts.length !== 0 ?
					<div className="arts__body">
						{arts.map(art =>
							<div
								className="arts__item"
								key={art.path}
							>
								<NavLink to={`arts/${art._id}`} className="arts__link">
									{art.name}
								</NavLink>
								<img src={imgSrc(art.path)} alt="картина" className="arts__image" />
							</div>
						)}
					</div> :
					<div className="arts__empty">
						Не добавлено ни одной картины
					</div>
				}
			</div>
		</div>
	)
}