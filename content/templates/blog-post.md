<%* 
let title = await tp.system.prompt("Enter article title...", "New article");
//await tp.file.rename(tp.user.to_slug(title));
%>---
date: '<% moment(tp.file.creation_date()).toISOString() %>'
draft: true
title: '<% title %>'
type: blog
---<%* app.workspace.activeLeaf.view.editor?.focus(); %>
Enter text here!<% tp.file.cursor() %>