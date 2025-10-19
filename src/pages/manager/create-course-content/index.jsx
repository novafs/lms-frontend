import React from "react";
import { useState, useEffect, useRef, useMemo } from "react";
import { CKEditor, useCKEditorCloud } from "@ckeditor/ckeditor5-react";

import { zodResolver } from "@hookform/resolvers/zod";
import { mutateContentSchema } from "../../../utils/zodSchema";
import { useForm } from "react-hook-form";
import { createContent, updateContent } from "../../../services/courseService";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

const LICENSE_KEY =
  "eyJhbGciOiJFUzI1NiJ9.eyJleHAiOjE3ODgwNDc5OTksImp0aSI6ImY1ZmQ4Yzc5LWM1MGEtNDg3Ni04YzdiLWNlYzg3ZWY5MWNlNCIsImxpY2Vuc2VkSG9zdHMiOlsiMTI3LjAuMC4xIiwibG9jYWxob3N0IiwiMTkyLjE2OC4qLioiLCIxMC4qLiouKiIsIjE3Mi4qLiouKiIsIioudGVzdCIsIioubG9jYWxob3N0IiwiKi5sb2NhbCJdLCJ1c2FnZUVuZHBvaW50IjoiaHR0cHM6Ly9wcm94eS1ldmVudC5ja2VkaXRvci5jb20iLCJkaXN0cmlidXRpb25DaGFubmVsIjpbImNsb3VkIiwiZHJ1cGFsIl0sImxpY2Vuc2VUeXBlIjoiZGV2ZWxvcG1lbnQiLCJmZWF0dXJlcyI6WyJEUlVQIiwiRTJQIiwiRTJXIiwiQk9YIl0sInZjIjoiNzlkNzExMjYifQ.QCqf22NisRp5MjaU4aVaynzt42rVmopFHwR4szcf_FBcCYyZJR6iBFc2lszdezwtGT-KleXc_MfQl02W5wcV0Q";

export default function ManageCreateContentPage() {
  const content = useLoaderData();

  const { id, contentId } = useParams();
  

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(mutateContentSchema),
    defaultValues: {
      courseId: id,
      title: content?.title,
      type: content?.type,
      youtubeId: content?.youtubeId,
      text: content?.text,
    },
  });



  const mutateCreate = useMutation({
    mutationFn: (data) => createContent(data),
  });

  const mutateUpdate = useMutation({
    mutationFn: (data) => updateContent(data, contentId),
  });

  const type = watch("type");

  const onSubmit = async (values) => {
    try {
      if (content === undefined) {
        await mutateCreate.mutateAsync({
          ...values,
          courseId: id
        });
      } else {
        await mutateUpdate.mutateAsync({
          ...values,
          courseId: id
        });
      }

      navigate(`/manager/courses/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  // CKditor Configuration
  const editorContainerRef = useRef(null);
  const editorRef = useRef(null);
  const [isLayoutReady, setIsLayoutReady] = useState(false);
  const cloud = useCKEditorCloud({ version: "46.0.2" });

  useEffect(() => {
    setIsLayoutReady(true);

    return () => setIsLayoutReady(false);
  }, []);

  const { ClassicEditor, editorConfig } = useMemo(() => {
    if (cloud.status !== 'success' || !isLayoutReady) {
			return {};
		}

		const {
			ClassicEditor,
			Alignment,
			Autoformat,
			AutoImage,
			Autosave,
			BlockQuote,
			Bold,
			Code,
			Emoji,
			Essentials,
			FindAndReplace,
			Fullscreen,
			Heading,
			Highlight,
			ImageBlock,
			ImageCaption,
			ImageEditing,
			ImageInline,
			ImageInsert,
			ImageInsertViaUrl,
			ImageResize,
			ImageStyle,
			ImageTextAlternative,
			ImageToolbar,
			ImageUpload,
			ImageUtils,
			Indent,
			IndentBlock,
			Italic,
			Link,
			LinkImage,
			List,
			ListProperties,
			MediaEmbed,
			Mention,
			Paragraph,
			PasteFromOffice,
			RemoveFormat,
			SimpleUploadAdapter,
			SpecialCharacters,
			SpecialCharactersArrows,
			SpecialCharactersCurrency,
			SpecialCharactersEssentials,
			SpecialCharactersLatin,
			SpecialCharactersMathematical,
			SpecialCharactersText,
			Strikethrough,
			Subscript,
			Superscript,
			Table,
			TableCaption,
			TableCellProperties,
			TableColumnResize,
			TableProperties,
			TableToolbar,
			TextTransformation,
			TodoList,
			Underline
		} = cloud.CKEditor;

		return {
			ClassicEditor,
			editorConfig: {
				toolbar: {
					items: [
						'undo',
						'redo',
						'|',
						'findAndReplace',
						'fullscreen',
						'|',
						'heading',
						'|',
						'bold',
						'italic',
						'underline',
						'strikethrough',
						'subscript',
						'superscript',
						'code',
						'removeFormat',
						'|',
						'emoji',
						'specialCharacters',
						'link',
						'insertImage',
						'mediaEmbed',
						'insertTable',
						'highlight',
						'blockQuote',
						'|',
						'alignment',
						'|',
						'bulletedList',
						'numberedList',
						'todoList',
						'outdent',
						'indent'
					],
					shouldNotGroupWhenFull: false
				},
				plugins: [
					Alignment,
					Autoformat,
					AutoImage,
					Autosave,
					BlockQuote,
					Bold,
					Code,
					Emoji,
					Essentials,
					FindAndReplace,
					Fullscreen,
					Heading,
					Highlight,
					ImageBlock,
					ImageCaption,
					ImageEditing,
					ImageInline,
					ImageInsert,
					ImageInsertViaUrl,
					ImageResize,
					ImageStyle,
					ImageTextAlternative,
					ImageToolbar,
					ImageUpload,
					ImageUtils,
					Indent,
					IndentBlock,
					Italic,
					Link,
					LinkImage,
					List,
					ListProperties,
					MediaEmbed,
					Mention,
					Paragraph,
					PasteFromOffice,
					RemoveFormat,
					SimpleUploadAdapter,
					SpecialCharacters,
					SpecialCharactersArrows,
					SpecialCharactersCurrency,
					SpecialCharactersEssentials,
					SpecialCharactersLatin,
					SpecialCharactersMathematical,
					SpecialCharactersText,
					Strikethrough,
					Subscript,
					Superscript,
					Table,
					TableCaption,
					TableCellProperties,
					TableColumnResize,
					TableProperties,
					TableToolbar,
					TextTransformation,
					TodoList,
					Underline
				],
				fullscreen: {
					onEnterCallback: container =>
						container.classList.add(
							'editor-container',
							'editor-container_classic-editor',
							'editor-container_include-fullscreen',
							'main-container'
						)
				},
				heading: {
					options: [
						{
							model: 'paragraph',
							title: 'Paragraph',
							class: 'ck-heading_paragraph'
						},
						{
							model: 'heading1',
							view: 'h1',
							title: 'Heading 1',
							class: 'ck-heading_heading1'
						},
						{
							model: 'heading2',
							view: 'h2',
							title: 'Heading 2',
							class: 'ck-heading_heading2'
						},
						{
							model: 'heading3',
							view: 'h3',
							title: 'Heading 3',
							class: 'ck-heading_heading3'
						},
						{
							model: 'heading4',
							view: 'h4',
							title: 'Heading 4',
							class: 'ck-heading_heading4'
						},
						{
							model: 'heading5',
							view: 'h5',
							title: 'Heading 5',
							class: 'ck-heading_heading5'
						},
						{
							model: 'heading6',
							view: 'h6',
							title: 'Heading 6',
							class: 'ck-heading_heading6'
						}
					]
				},
				image: {
					toolbar: [
						'toggleImageCaption',
						'imageTextAlternative',
						'|',
						'imageStyle:inline',
						'imageStyle:wrapText',
						'imageStyle:breakText',
						'|',
						'resizeImage'
					]
				},
        initialData: content?.text,
        licenseKey: LICENSE_KEY,
        link: {
					addTargetToExternalLinks: true,
					defaultProtocol: 'https://',
					decorators: {
						toggleDownloadable: {
							mode: 'manual',
							label: 'Downloadable',
							attributes: {
								download: 'file'
							}
						}
					}
				},
				list: {
					properties: {
						styles: true,
						startIndex: true,
						reversed: true
					}
				},
				mention: {
					feeds: [
						{
							marker: '@',
							feed: [
								/* See: https://ckeditor.com/docs/ckeditor5/latest/features/mentions.html */
							]
						}
					]
				},
				placeholder: 'Type or paste your content here!',
				table: {
					contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells', 'tableProperties', 'tableCellProperties']
				}
      },
    };
  }, [cloud, isLayoutReady]);

  return (
    <>
      <div
        id="Breadcrumb"
        className="flex items-center gap-5 *:after:content-['/'] *:after:ml-5"
      >
        <span className="last-of-type:after:content-[''] last-of-type:font-semibold">
          Manage Course
        </span>
        <span className="last-of-type:after:content-[''] last-of-type:font-semibold">
          Course
        </span>
        <span className="last-of-type:after:content-[''] last-of-type:font-semibold">
          {content === undefined ? "Add" : "Edit"} Content
        </span>
      </div>
      <header className="flex items-center justify-between gap-[30px]">
        <div className="flex items-center gap-[30px]">
          <div className="flex shrink-0 w-[150px] h-[100px] rounded-[20px] overflow-hidden bg-[#D9D9D9]">
            <img
              src="/assets/images/thumbnails/th-1.png"
              className="w-full h-full object-cover"
              alt="thumbnail"
            />
          </div>
          <div>
            <h1 className="font-extrabold text-[28px] leading-[42px]">
              {content === undefined ? "Add" : "Edit"} Content
            </h1>
            <p className="text-[#838C9D] mt-[1]">
              Give a best content for the course
            </p>
          </div>
        </div>
      </header>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-[930px] rounded-[30px] p-[30px] gap-[30px] bg-[#F8FAFB]"
      >
        <div className="flex flex-col gap-[10px]">
          <label htmlFor="title" className="font-semibold">
            Content Title
          </label>
          <div className="flex items-center w-full rounded-full border border-[#CFDBEF] gap-3 px-5 transition-all duration-300 focus-within:ring-2 focus-within:ring-[#662FFF]">
            <img
              src="/assets/images/icons/note-favorite-black.svg"
              className="w-6 h-6"
              alt="icon"
            />
            <input
              {...register("title")}
              type="text"
              id="title"
              className="appearance-none outline-none w-full py-3 font-semibold placeholder:font-normal placeholder:text-[#838C9D] !bg-transparent"
              placeholder="Write better name for your course"
            />
          </div>
          <span className="error-message text-[#FF435A]">
            {errors?.title?.message}
          </span>
        </div>
        <div className="flex flex-col gap-[10px]">
          <label htmlFor="type" className="font-semibold">
            Select Type
          </label>
          <div className="flex items-center w-full rounded-full border border-[#CFDBEF] gap-3 px-5 transition-all duration-300 focus-within:ring-2 focus-within:ring-[#662FFF]">
            <img
              src="/assets/images/icons/crown-black.svg"
              className="w-6 h-6"
              alt="icon"
            />
            <select
              {...register("type")}
              id="type"
              className="appearance-none outline-none w-full py-3 px-2 -mx-2 font-semibold placeholder:font-normal placeholder:text-[#838C9D] !bg-transparent"
            >
              <option value="" hidden>
                Choose content type
              </option>
              <option value="video">Video</option>
              <option value="text">Text</option>
            </select>
            <img
              src="/assets/images/icons/arrow-down.svg"
              className="w-6 h-6"
              alt="icon"
            />
          </div>
          <span className="error-message text-[#FF435A]">
            {errors?.type?.message}
          </span>
        </div>
        {type === "video" && (
          <div className="flex flex-col gap-[10px]">
            <label htmlFor="video" className="font-semibold">
              Youtube Video ID
            </label>
            <div className="flex items-center w-full rounded-full border border-[#CFDBEF] gap-3 px-5 transition-all duration-300 focus-within:ring-2 focus-within:ring-[#662FFF]">
              <img
                src="/assets/images/icons/bill-black.svg"
                className="w-6 h-6"
                alt="icon"
              />
              <input
                {...register("youtubeId")}
                type="text"
                id="video"
                className="appearance-none outline-none w-full py-3 font-semibold placeholder:font-normal placeholder:text-[#838C9D] !bg-transparent"
                placeholder="Write tagline for better copy"
              />
            </div>
            <span className="error-message text-[#FF435A]">
              {errors?.youtubeId?.message}
            </span>
          </div>
        )}
        {type === "text" && (
          <div className="flex flex-col gap-[10px]">
            <label className="font-semibold">Content Text</label>
            <div
              className="editor-container editor-container_classic-editor"
              ref={editorContainerRef}
            >
              <div className="editor-container__editor">
                <div ref={editorRef}>
                  {ClassicEditor && editorConfig && (
                    <CKEditor
                      editor={ClassicEditor}
                      config={editorConfig}
                      onChange={(_, editor) => {
                        const data = editor.getData();
                        setValue("text", data); // Register with React Hook Form
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
            <span className="error-message text-[#FF435A]">
              {errors?.text?.message}
            </span>
          </div>
        )}
        <div className="flex items-center gap-[14px]">
          <button
            type="button"
            className="w-full rounded-full border border-[#060A23] p-[14px_20px] font-semibold text-nowrap"
          >
            Save as Draft
          </button>
          <button
            type="submit"
            disabled={content === undefined  ? mutateCreate.isLoading : mutateUpdate.isLoading}
            className="w-full rounded-full p-[14px_20px] font-semibold text-[#FFFFFF] bg-[#662FFF] text-nowrap"
          >
            {content === undefined ? "Add" : "Edit"} Content Now
          </button>
        </div>
      </form>
    </>
  );
}
