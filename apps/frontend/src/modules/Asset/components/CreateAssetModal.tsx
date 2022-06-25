import { useFormik } from "formik";
import { FC } from "react";
import ReactModal from "react-modal";
import { Asset, AssetStatus } from "../Types";
import Input from "./Input";

interface Props {
  show: boolean;
  onClose(): void;
  onSubmit(formData: Omit<Asset, "assetID">): void;
}

const CreateAssetModal: FC<Props> = ({ show, onClose, onSubmit }) => {
  const formik = useFormik({
    initialValues: {
      area: "",
      location: "",
      owner: "",
      status: AssetStatus.REGISTERED,
    },
    onSubmit: (values, { resetForm }) => {
      onSubmit(values);
      resetForm();
    },
    validateOnChange: true,
    enableReinitialize: true,
  });

  return (
    <ReactModal
      isOpen={show}
      className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full flex items-center justify-center"
      contentLabel="Create Asset"
      ariaHideApp={false}
    >
      <div className="relative p-4 w-full max-w-lg h-full md:h-auto">
        <div className="relative bg-white rounded-lg shadow">
          <div className="flex justify-between items-start py-4 px-6 rounded-t border-b dark:border-slate-600">
            <h3 className="text-xl font-semibold text-slate-900">
              Create New Asset
            </h3>
            <button
              type="button"
              className="text-slate-400 bg-transparent hover:bg-slate-200 hover:text-slate-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
              data-modal-toggle="defaultModal"
              onClick={onClose}
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <div className="py-4 px-6 text-sm flex flex-col gap-4">
            <Input
              name="location"
              placeholder="Input asset location"
              value={formik.values.location}
              onChange={formik.handleChange}
            />
            <Input
              name="owner"
              placeholder="Input owner"
              value={formik.values.owner}
              onChange={formik.handleChange}
            />
            <Input
              name="area"
              placeholder="Input area in m2"
              value={formik.values.area}
              onChange={formik.handleChange}
            />
          </div>
          <div className="flex items-center py-4 px-6 rounded-b border-t border-slate-200">
            <button
              data-modal-toggle="defaultModal"
              type="button"
              className="text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              onClick={() => formik.handleSubmit()}
            >
              Create
            </button>
            <button
              data-modal-toggle="defaultModal"
              type="button"
              className="ml-auto text-slate-500 bg-white hover:bg-slate-100 focus:ring-4 focus:outline-none focus:ring-emerald-300 rounded-lg border border-slate-200 text-sm font-medium px-5 py-2.5 hover:text-slate-900 focus:z-10"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </ReactModal>
  );
};

export default CreateAssetModal;
