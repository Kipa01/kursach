import React from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router"
import { imgSrc } from "../helpers"
import { GoBack } from "../components/GoBack.jsx"
import { useDispatch } from "react-redux"
import { addArt, delArt } from "../actions/user"
export const ArtPage = () => {
	const params = useParams()
	const dispatch = useDispatch()
	const { arts } = useSelector(state => state.arts)
	const { currentUser } = useSelector(state => state.user)
	const art = arts.filter(art => art._id === params.id)[0]
	const isFavorite = currentUser?.files?.find(item => item === art['path']) ? true : false

	const createMarkupText = () => {
		return {
			__html: art['desc'],
		}
	}

	const changeStatus = () => {
		isFavorite ? dispatch(delArt(currentUser.id, art['path'])) : dispatch(addArt(currentUser.id, art['path']))
	}

	return (
		<div className="art-page">
			<div className="container">
				<GoBack />
				<div className="art-page__body">
					<div className="art-page__title">
						{art['name']}
						{currentUser?.role !== 'admin' &&
							<button
								className={isFavorite ? 'art-page__favorite button active' : 'art-page__favorite button'}
								onClick={() => changeStatus()}>
								{isFavorite ? 'Удалить из избранного' : 'Добавить в избранное'}
							</button>
						}
					</div>
					<div className="art-page__image">
						<img src={imgSrc(art['path'])} alt="изображение картины" />
					</div>
					<div className="art-page__author">
						Автор: <span>{art['author']}</span>
					</div>
					<div className="art-page__desc" dangerouslySetInnerHTML={createMarkupText()}></div>
				</div>
			</div>
		</div>
	)
}