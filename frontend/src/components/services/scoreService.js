import apiClient from "./apiClient";

export async function fetchScoreByRegistrationNumber(sbd) {
   return apiClient(`/api/lookup/?sbd=${encodeURIComponent(sbd)}`);
}

export async function fetchScoreReport() {
   return apiClient("/api/report/");
}

export async function fetchTopStudentsByGroup(group) {
   return apiClient(`/api/top-group/?group=${encodeURIComponent(group)}`);
}

export async function fetchStats() {
   return apiClient("/api/stats/");
}

export async function fetchTopNational() {
   return apiClient("/api/top-national/");
}

export async function fetchScoreDistributionBySubject(subject) {
   return apiClient(`/api/distribution/?subject=${encodeURIComponent(subject)}`);
}

export async function fetchAnalyzeScoreReport(report) {
    const payload = {
        "report": report,
    };
    return apiClient("/api/ai-analysis/", {
        method: "POST",
        body: payload,
    });
}


