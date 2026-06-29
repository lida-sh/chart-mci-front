import { object, string, mixed, array, number } from "yup";
const validFileExtensions = [
  "jpg",
  "gif",
  "png",
  "jpeg",
  "pdf",
  "docx",
  "doc",
  "bpm",
  "tiff",
  "pptx",
];
const MAX_FILE_SIZE = 102400000;

function isValidFileType(fileName: string): boolean {
  return (
    !!fileName &&
    validFileExtensions.indexOf(fileName.split(".").pop() || "") > -1
  );
}
export const useArchitectureValidation = () => {
  const { $t } = useNuxtApp();

  const schema = object({
    title: string().required().label($t("title")),
    status: string().required().label($t("status")),
    type: string().required().label($t("type")),
    office_manager_count: string().required().label($t("office_manager_count")),
    old_positions_count: string().required().label($t("old_positions_count")),
    old_expert_positions_count: string().required().label($t("old_expert_positions_count")),
    old_directorates_count: string().required().label($t("old_directorates_count")),
    old_departments_count: string().required().label($t("old_departments_count")),
    description: string().nullable().label($t("description")),
    files: array().nullable()
      .test(
        "fileSize",
        "اندازه هر یک از فایل ها نباید بیشتر از یک مگا بایت باشد.",
        (files) => {
          if (!files || files.length === 0) return true;
          return files && files.every((file) => file.size <= MAX_FILE_SIZE); // max 5MB
        }
      )
      .test(
        "fileType",
        "فرمت فایل باید jpg، jpeg، png، bpm، tiff، gif، doc، docx و یا pdf باشد.",
        (files) => {
          if (!files || files.length === 0) return true;
          return (
            files &&
            files.every((file) => isValidFileType(file.name.toLowerCase()))
          );
        }
      )
      .label($t("files")),
  });
  return { schema };
};
export const useEditArchitectureValidation = () => {
  const { $t } = useNuxtApp();

  const schema = object({
    title: string().required().label($t("title")),
    status: string().required().label($t("status")),
    old_positions_count: string().required().label($t("old_positions_count")),
    old_expert_positions_count: string().required().label($t("old_expert_positions_count")),
    old_directorates_count: string().required().label($t("old_directorates_count")),
    old_departments_count: string().required().label($t("old_departments_count")),
    office_manager_count: string().required().label($t("office_manager_count")),
    description: string().nullable().label($t("description")),
    type: string().required().label($t("type")),
    files: array()
      .nullable()
      .test(
        "fileSize",
        "اندازه هر یک از فایل ها نباید بیشتر از یک مگا بایت باشد.",
        (files) => {
          if (!files || files.length === 0) return true;
          return files && files.every((file) => file.size <= MAX_FILE_SIZE); // max 5MB
        }
      )
      .test(
        "fileType",
        "فرمت فایل باید jpg، jpeg، png، bpm، tiff، gif، doc، docx و یا pdf باشد.",
        (files) => {
          if (!files || files.length === 0) return true;
          return (
            files &&
            files.every((file) => isValidFileType(file.name.toLowerCase()))
          );
        }
      )
      .label($t("files")),
    fileIdsForDelete: mixed(),
  });

  return { schema };
};
