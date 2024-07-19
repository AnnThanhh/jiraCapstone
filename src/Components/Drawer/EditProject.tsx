import React, { ChangeEvent, FormEvent, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { useDispatch, useSelector } from 'react-redux';
import { DispatchType, RootState } from '../../Redux/configStore';
import {
  changeCategoryAction,
  changeDescriptionAction,
  changeProjectAction,
  closeEditProjectAction,
  updateProjectApi,
} from '../../Redux/reducers/editProjectReducer';
import { getProjectCategoryAsync } from '../../Redux/reducers/projectCategoryReducer';
import { setIsFragProject } from '../../Redux/reducers/projectReducer';

type Props = {};

export default function EditProject({}: Props) {
  const dispatch: DispatchType = useDispatch();
  
  // Lấy dữ liệu từ store
  const { projectCategory } = useSelector((state: RootState) => state.projectCategoryReducer);
  const { projectDetail, projectUpdate } = useSelector((state: RootState) => state.editProjectReducer);

  // Hàm gọi API lấy danh mục dự án
  const getProjectCategory = () => {
    const actionApi = getProjectCategoryAsync();
    dispatch(actionApi);
  };

  // Render danh sách danh mục dự án
  const renderProjectCategory = () => {
    return projectCategory.map((projectCategory, index) => {
      return <option key={index} value={projectCategory.id}>{projectCategory.projectCategoryName}</option>;
    });
  };

  // Xử lý thay đổi input
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let values = { ...projectDetail, [name]: value };
    const actionEdit = changeProjectAction(values);
    dispatch(actionEdit);
  };

  // Xử lý thay đổi select
  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const actionCategory = changeCategoryAction(Number(e.target.value));
    dispatch(actionCategory);
  };

  // Xử lý thay đổi nội dung editor
  const handleEditorChange = (content: string) => {
    const actionEditor = changeDescriptionAction(content);
    dispatch(actionEditor);
  };

  // Xử lý submit form
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const actionUpdate = updateProjectApi(projectDetail.id, projectUpdate);
    dispatch(actionUpdate);
  };

  // Effect để gọi API lấy danh mục dự án khi component được render lần đầu
  useEffect(() => {
    getProjectCategory();
  }, []);

  // Render form chỉnh sửa dự án
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <div className="mb-3">
          <label className="form-label">Project id</label>
          <input className="form-control" name="id" value={projectDetail.id} disabled />
        </div>
        <div className="mb-3">
          <label className="form-label">Project name</label>
          <input className="form-control" name="projectName" value={projectDetail.projectName} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Category</label>
          <select className="form-control" name="projectCategory" value={projectDetail.projectCategory.id} onChange={handleSelectChange}>
            {renderProjectCategory()}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <Editor
            apiKey='hcm0hmgynoxuu4vff7v7agu0aj4c9r5opgilwqj1ombpuqnc'
            value={projectDetail.description}
            init={{
              height: 300,
              menubar: false,
              plugins: [
                'advlist autolink lists link image charmap print preview anchor',
                'searchreplace visualblocks code fullscreen',
                'insertdatetime media table paste code help wordcount'
              ],
              toolbar: 'undo redo | formatselect | ' +
                'bold italic backcolor | alignleft aligncenter ' +
                'alignright alignjustify | bullist numlist outdent indent | ' +
                'removeformat | help',
              content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
            }}
            onEditorChange={handleEditorChange}
          />
        </div>
        <button className="btn btn-primary" type="submit">
          Save
        </button>
        <button type="button" className="btn btn-secondary ms-3"
          onClick={() => {
            const actionClose = closeEditProjectAction(1);
            dispatch(actionClose);
          }}>
          Cancel
        </button>
      </div>
    </form>
  );
}
