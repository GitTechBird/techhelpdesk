import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";
dayjs.extend(customParseFormat);
dayjs.extend(relativeTime);
dayjs.extend(utc);

export const parseLocaleDate = (str: string, format: string, locale: string): Date | void => {
    const parsed = dayjs(str, format, locale);
    if (parsed.isValid()) {
        return parsed.toDate();
    }
};

export const formatLocaleDate = (date: Date, format: string, locale: string): string => {
    return dayjs(date).locale(locale).format(format);
};

export const parseDate = (str: string, format: string): Date | undefined => {
    const parsed = format === "iso" ? dayjs(str) : dayjs(str, format, true);
    if (parsed.isValid()) {
        return parsed.utc().toDate();
    }
    return undefined;
};

export const formatDate = (date: Date, format: string): string | undefined => {
    const dt = dayjs(date);
    if (dt.isValid()) {
        return format === "iso" ? dt.utc().format() : dt.utc().format(format);
    }
    return undefined;
};

export const parseFormat = (str: string, parse: string, format: string) => {
    const date = parseDate(str, parse);
    if (date) {
        return formatDate(date, format);
    }
    return undefined;
};

export const formatToLocalDate = (date: Date, format: string) => {
    const dt = dayjs(date);
    if (dt.isValid()) {
        return format === "iso" ? dt.utc().local().format() : dt.utc().local().format(format);
    }
    return undefined;
};

export const parseFormatToLocalDate = (str: string, parse: string, format: string) => {
    const date = parseDate(str, parse);
    if (date) {
        return formatToLocalDate(date, format);
    }
    return undefined;
};

export const formatEmailDateDisplay = (value: string): string | undefined => {
    const date = dayjs(value);
    if (date.isValid()) return date.format("ddd, D MMM YYYY [at] H:mm,");
    return undefined;
};

export const formatAdditionalFieldDateDisplay = (value: string): string | undefined => {
    const date = dayjs(value);
    if (date.isValid()) return date.format("MMMM D, YYYY");
    return undefined;
};

export const isISODate = (dateString: string): boolean => {
    // ISO date format: YYYY-MM-DDTHH:mm:ss.sssZ
    const isoDateRegex = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(\.\d{1,3})?Z$/;

    return isoDateRegex.test(dateString);
};
