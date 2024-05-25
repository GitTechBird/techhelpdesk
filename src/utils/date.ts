import dayjs from "dayjs";
import isYesterday from "dayjs/plugin/isYesterday";
dayjs.extend(isYesterday);

export function formatDate(time: string | number | Date): string {
    const day = dayjs(time);
    if (dayjs().isSame(day, "day")) {
        return day.format("h:mm A");
    }
    if (day.isYesterday()) {
        return "Yesterday";
    }
    if (dayjs().isSame(day, "week")) {
        return day.format("dddd");
    }
    if (dayjs().isSame(day, "year")) {
        return day.format("D MMM");
    }
    return day.format("D MMM YYYY");
}
export function formatTime(time: string | number | Date): string {
    const day = dayjs(time);
    return day.format("h:mm A");
}
export function formatDateYear(time: string | number | Date): string {
    const day = dayjs(time);
    if (dayjs().isSame(day, "year")) {
        return day.format("D MMM");
    }
    return day.format("D MMM YYYY");
}

export function formatDate2(time: string | number | Date): string {
    const day = dayjs(time);
    if (dayjs().isSame(day, "day")) {
        return day.format("h:mm A");
    }

    if (dayjs().isSame(day, "year")) {
        return day.format("D MMM");
    }
    return day.format("D MMM YYYY");
}

export function formatDateGroup(time: string | number | Date): string {
    const day = dayjs(time);
    if (dayjs().isSame(day, "day")) {
        return "Today";
    }
    if (day.isYesterday()) {
        return "Yesterday";
    }
    if (dayjs().isSame(day, "week")) {
        return day.format("dddd");
    }
    if (dayjs().isSame(day, "year")) {
        return day.format("D MMM");
    }
    return day.format("D MMM YYYY");
}

export const isValidDateString = (value: string | undefined): boolean => {
    if (typeof value === "undefined") return false;
    const date = dayjs(value);
    return date.isValid();
};

export function timeSince(date: Date | undefined, type: string = "synced"): string {
    if (!date) return "";
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    const day = dayjs(date);

    if (seconds < 60) {
        return `Last ${type} few seconds ago`;
    } else if (seconds < 600) {
        return `Last ${type} few minutes ago`;
    } else if (dayjs().isSame(day, "day")) {
        return `Last ${type} today at ${day.format("h:mm A")}`;
    } else if (day.isYesterday()) {
        return `Last ${type} yesterday at ${day.format("h:mm A")}`;
    } else {
        return `Last ${type} on ${day.format("D MMM YYYY")} at ${day.format("h:mm A")}`;
    }
}

export function formatDateGroupNew(time: string | number | Date): string {
    const day = dayjs(time);
    if (dayjs().isSame(day, "day")) {
        return `Today at ${day.format("h:mm A")}`;
    }
    if (day.isYesterday()) {
        return `Yesterday at ${day.format("h:mm A")}`;
    }
    if (dayjs().isSame(day, "year")) {
        return `${day.format("MMM D")} at ${day.format("h:mm A")}`;
    }
    return `${day.format("MMM D, YYYY")} at ${day.format("h:mm A")}`;
}
