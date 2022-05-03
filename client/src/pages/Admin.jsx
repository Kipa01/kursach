import React, { useEffect, useCallback, useRef } from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup"
import { addArt, deleteArt } from "../actions/art"
import { useDispatch, useSelector } from "react-redux"
import { createReactEditorJS } from 'react-editor-js'
import { NavLink } from "react-router-dom"

import Paragraph from '@editorjs/paragraph'
import List from '@editorjs/list'
import LinkTool from '@editorjs/link'
import Header from '@editorjs/header'
import Marker from '@editorjs/marker'
import { notifyUserError } from "../helpers/Pnotify"

const EDITOR_JS_TOOLS = {
	list: List,
	linkTool: LinkTool,
	header: Header,
	marker: Marker,
}

const i18n = {
	messages: {
		ui: {
			blockTunes: {
				toggler: {
					'Click to tune': 'Нажмите, чтобы настроить',
					'or drag to move': 'или перетащите',
				},
			},
			inlineToolbar: {
				converter: {
					'Convert to': 'Конвертировать в',
				},
			},
			toolbar: {
				toolbox: {
					Add: 'Добавить',
				},
			},
		},
		toolNames: {
			Text: 'Параграф',
			Heading: 'Заголовок',
			List: 'Список',
			Link: 'Ссылка',
			Marker: 'Маркер',
			Bold: 'Полужирный',
			Italic: 'Курсив',
			InlineCode: 'Моноширинный',
		},
		tools: {
			link: {
				'Add a link': 'Вставьте ссылку',
			},
			stub: {
				'The block can not be displayed correctly.': 'Блок не может быть отображен',
			},
		},
		blockTunes: {
			delete: {
				Delete: 'Удалить',
			},
			moveUp: {
				'Move up': 'Переместить вверх',
			},
			moveDown: {
				'Move down': 'Переместить вниз',
			},
		},
	},
}

const ReactEditorJS = createReactEditorJS()

const schema = yup.object().shape({
	name: yup.string().required(),
	author: yup.string().required(),
	// desc: yup.string().required(),
	file: yup.mixed().test(value => value[0]?.size <= 2000000).test(value => ['image/jpg', 'image/jpeg', 'image/png', 'image/webp', 'image/svg'].includes(value[0]?.type))
})

export const Admin = () => {
	const dispatch = useDispatch()
	const { arts } = useSelector(state => state.arts)
	console.log(arts);
	const editorCore = React.useRef(null)

	const handleInitialize = React.useCallback((instance) => {
		editorCore.current = instance
	}, [])

	const { register, formState: { errors }, handleSubmit, reset } = useForm({
		mode: "onBlur",
		resolver: yupResolver(schema)
	})

	const editoToHtml = (data) => {
		let outputHtml = document.createElement('div')
		data.map((block) => {
			switch (block.type) {
				case 'paragraph':
					const p = document.createElement('p')
					p.innerHTML = block.data.text
					outputHtml.appendChild(p)
					break
				case 'header':
					const h2 = document.createElement('h2')
					h2.innerHTML = block.data.text
					outputHtml.appendChild(h2)
					break
				case 'list':
					let listTag
					if (block.data.style === 'unordered') {
						listTag = document.createElement('ul')
					} else {
						listTag = document.createElement('ol')
					}
					block.data.items.map((item) => {
						const li = document.createElement('li')
						li.innerHTML = item
						listTag.appendChild(li)
					})
					outputHtml.appendChild(listTag)
					break
				case 'linkTool':
					const a = document.createElement('a')
					const value = block.data.link
					a.setAttribute('href', value)
					a.setAttribute('target', '_blank')
					a.innerHTML = value
					outputHtml.appendChild(a)
					break
				default:
					break
			}
		})
		return outputHtml
	}

	const onSubmit = async (data) => {
		const outputData = await editorCore.current.save()
		const text = editoToHtml(outputData.blocks).innerHTML
		if (text.length === 0) {
			notifyUserError("Заполните описание картины")
		} else {
			addArt(dispatch, data.name, data.author, text, data.file)
			reset()
			console.log(text);
		}
		// addArt(dispatch, data.name, data.author, data.desc, data.file)
		// reset()
	}

	const deleteHandler = (id) => {
		deleteArt(dispatch, id)
	}

	return (
		<div className="admin">
			<div className="container">
				<div className="admin__body">
					<div className="admin__title">
						Добавить картину
					</div>
					<form className="admin__form form-admin" onSubmit={handleSubmit(onSubmit)}>
						<input
							className={errors.name ? "form-admin__input error input" : "form-admin__input input"}
							placeholder="Название картины"
							name="name"
							type="text"
							{...register('name')}
						/>
						<input
							className={errors.author ? "form-admin__input error input" : "form-admin__input input"}
							placeholder="Автор"
							name="author"
							type="text"
							{...register('author')}
						/>
						<input
							className="form-admin__input input file"
							name="image"
							type="file"
							id="admin-file"
							{...register('file')}
						/>
						<label
							className={errors.file ? "form-admin__input form-admin__label error input" : "form-admin__input form-admin__label input"}
							htmlFor="admin-file"
						>Выберите изображение</label>
						{/* <textarea
							className={errors.desc ? "form-admin__input error input" : "form-admin__input input"}
							placeholder="Описание картины"
							name="desc"
							{...register('desc')}
						/> */}
						<ReactEditorJS onInitialize={handleInitialize} tools={EDITOR_JS_TOOLS} i18n={i18n} />
						<button className="form-admin__button button" type="submit">
							добавить картину
						</button>
					</form>
					{arts.length > 0 && (
						<>
							<div className="admin__title">
								Удалить картину
							</div>
							<div className="admin__delete delete-admin">
								{arts.map(item =>
									<div className="delete-admin__item" key={item._id}>
										<NavLink to={"/arts/" + item._id} className="delete-admin__name">
											{item.name}
										</NavLink>
										<div className="delete-admin__button" onClick={() => deleteHandler(item._id)}>
											Удалить картину
										</div>
									</div>
								)}
							</div>
						</>
					)}
				</div>

			</div>
		</div>
	)
}