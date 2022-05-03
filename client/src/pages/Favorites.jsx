import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { imgSrc } from "../helpers"
import { NavLink } from "react-router-dom"

export const Favorites = () => {
	const { currentUser } = useSelector(state => state.user)
	const { arts } = useSelector(state => state.arts)
	const [files, setFiles] = useState([])

	useEffect(() => {
		if (currentUser.files.length > 0) {
			let arr = []
			arts.map(item => {
				currentUser?.files.map(file => {
					if (file === item.path) {
						arr.push(item)
					}
				})
			})
			setFiles(arr)
		}
	}, [])

	return (
		<div className="arts">
			<div className="container">
				{files.length > 0 ?
					<div className="arts__body">
						{files.map(art =>
							<div
								className="arts__item"
								key={art.path}
							>
								<NavLink to={`/arts/${art._id}`} className="arts__link">
									{art.name}
								</NavLink>
								<img src={imgSrc(art.path)} alt="картина" className="arts__image" />
							</div>
						)}
					</div> :
					<div className="arts__empty">
						Вы ещё не добавили картины в избранное
					</div>
				}
			</div>
		</div>
	)
}