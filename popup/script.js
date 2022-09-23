let saveInput = document.querySelector("#save-tabs input");
let saveButton = document.querySelector('#save-tabs button');


// save tabs
saveButton.addEventListener("click", (e) => {
    browser.tabs.query({ currentWindow: true })
        .then(res => {
            let tabList = {};
            tabList["name"] = saveInput.value;
            tabList["tabs"] = [];
            
            // Filter tabs without url, e.g., start page of browser
            res.forEach(tab => {
                if (tab.url) {
                    tabList["tabs"].push(
                        {
                            "title": tab.title,
                            "url": tab.url,
                            "favIconUrl": tab.favIconUrl
                        }
                    );
                };
            });

            
            if (tabList["tabs"].length > 0) {
                
            }
        }) 
        .catch(err => {

        });
    
})


// load tabs