var ajaxCall = (key, url, prompt) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: url,
      type: "POST",
      dataType: "json",
      data: JSON.stringify({
        engine: "ai-corner-davinci-003",
        prompt: prompt,
        temperature: 1,
        max_tokens: 1024,
        top_p: 0.5,
        frequency_penalty: 0,
        presence_penalty: 0,
        best_of: 1,
        stop: None
      }),
      headers: {
        "Content-Type": "application/json",
        //Authorization: `Bearer ${key}`,
        "api-key": `${key}`
      },
      crossDomain: true,
      success: function (response, status, xhr) {
        resolve({ response, status, xhr });
      },
      error: function (xhr, status, error) {
        const err = new Error('xhr error');
        err.status = xhr.status;
        reject(err);
      },
    });
  });
};

const url = "https://qs-openai-us-001.openai.azure.com/openai/deployments/ai-corner-davinci-003/completions?api-version=2022-12-01";

(function () {
  const template = document.createElement("template");
  template.innerHTML = `
      <style>
      </style>
      <div id="root" style="width: 100%; height: 100%;">
      </div>
    `;
  class MainWebComponent extends HTMLElement {
    async post(apiKey, prompt) {
      const { response } = await ajaxCall(
        apiKey,
        `${url}`,
        prompt
      );
      console.log(response.choices[0].text);
      return response.choices[0].text;
    }
  }
  customElements.define("custom-widget", MainWebComponent);
})();
