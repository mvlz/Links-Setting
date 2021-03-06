import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            en: {
                translations: {
                    hBtn: "Add Social",
                    cBtn: "Cancel",
                    sBtn: "Submit Social",
                    dBtn: "Delete",
                    eBtn: "Edit",
                    title: "Socials",
                    typeField: 'type',
                    linkField: 'Link',
                    tweeter: "Tweeter",
                    instagram: "Instagram",
                    website: "Website",
                    linkedin: "Linkedin",
                    telegram: "Telegram",
                    facebook: "Facebook",
                    confirmTitle: "Are you sure?",
                    confirmText1: `For delete social`,
                    confirmText2: `please fill "Confirm".`,
                    confirmField: "Confirm*",
                    userSetting: "User Setting",
                    editTitle: "Edit Social",
                    requiredError: "This field is required.",
                    validURLError: "Link must be a valid URL",
                    duplicatedError: "This link already exists.",
                },
            },
            fa: {
                translations: {
                    hBtn: "افزودن مسیر ارتباطی",
                    cBtn: "انصراف",
                    sBtn: "ثبت مسیر ارتباطی",
                    dBtn: "حذف",
                    eBtn: "ویرایش",
                    title: "مسیرهای ارتباطی",
                    typeField: 'نوع',
                    linkField: 'لینک',
                    tweeter: "توییتر",
                    instagram: "اینستاگرام",
                    website: "وبسایت",
                    linkedin: "لینکدین",
                    telegram: "تلگرام",
                    facebook: "فیسبوک",
                    confirmTitle: "آیا از تصمیم خود مطمئن هستید؟",
                    confirmText1: `برای حذف مسیر ارتباطی`,
                    confirmText2: `لطفا "تایید" را وارد نمایید.`,
                    confirmField: "تایید*",
                    userSetting: "تنظیمات کاربری",
                    editTitle: "ویرایش مسیر ارتباطی",
                    requiredError: "پر کردن این فیلد الزامی است.",
                    validURLError: "لینک باید یک URL معتبر باشد.",
                    duplicatedError: "این لینک از قبل وجود دارد.",
                }
            }
        },
        fallbackLng: "fa",
        debug: false,

        ns: ["translations"],
        defaultNS: "translations",

        keySeparator: false,

        interpolation: {
            escapeValue: false
        }
    });

export default i18n;