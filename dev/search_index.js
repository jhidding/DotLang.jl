var documenterSearchIndex = {"docs":
[{"location":"#GraphvizDotLang.jl","page":"GraphvizDotLang.jl","title":"GraphvizDotLang.jl","text":"","category":"section"},{"location":"","page":"GraphvizDotLang.jl","title":"GraphvizDotLang.jl","text":"Create Graphviz graphs straight from Julia. There is a Graphviz.jl package that offers interop between Julia and the Graphviz C library. However, it seems that this package does not give us a nice interface to generate DOT language.","category":"page"},{"location":"","page":"GraphvizDotLang.jl","title":"GraphvizDotLang.jl","text":"Depth = 3","category":"page"},{"location":"","page":"GraphvizDotLang.jl","title":"GraphvizDotLang.jl","text":"Graphviz works with a special language for describing graphs called DOT. The documentation of Graphviz describes the syntax for this language. This module helps generating expressions in the DOT language programmatically.","category":"page"},{"location":"","page":"GraphvizDotLang.jl","title":"GraphvizDotLang.jl","text":"This module defines a set of structs that match the different elements in the DOT language. The print(::IO, ::T) method is used to provide writers for each of these structs.","category":"page"},{"location":"","page":"GraphvizDotLang.jl","title":"GraphvizDotLang.jl","text":"Graphviz supports many attributes. This module does not check for validity of the attributes you give it.","category":"page"},{"location":"","page":"GraphvizDotLang.jl","title":"GraphvizDotLang.jl","text":"The syntax of Graphviz is very liberal. It will accept a lot of varieties of input. This module encapsulates all IDs in double quotation marks.","category":"page"},{"location":"#Examples","page":"GraphvizDotLang.jl","title":"Examples","text":"","category":"section"},{"location":"#Clusters","page":"GraphvizDotLang.jl","title":"Clusters","text":"","category":"section"},{"location":"","page":"GraphvizDotLang.jl","title":"GraphvizDotLang.jl","text":"using GraphvizDotLang: digraph, edge, node, save, attr, subgraph\n\ng = digraph(\"G\")\ncluster0 = subgraph(g, \"cluster_0\"; label=\"process #1\", style=\"filled\", color=\"lightgray\") |>\n    attr(:node; style=\"filled\", color=\"white\") |>\n    edge((\"a$i\" for i in 0:3)...)\ncluster1 = subgraph(g, \"cluster_1\"; label=\"process #2\", color=\"blue\") |>\n    attr(:node; style=\"filled\") |>\n    edge((\"b$i\" for i in 0:3)...)\ng |>\n    edge(\"start\", \"a0\") |>\n    edge(\"start\", \"b0\") |>\n    edge(\"a1\", \"b3\") |>\n    edge(\"b2\", \"a3\") |>\n    edge(\"a3\", \"a0\") |>\n    edge(\"a3\", \"end\") |>\n    edge(\"b3\", \"end\") |>\n    node(\"start\"; shape=\"Mdiamond\") |>\n    node(\"end\"; shape=\"Msquare\")\nsave(g, \"clusters.svg\")","category":"page"},{"location":"","page":"GraphvizDotLang.jl","title":"GraphvizDotLang.jl","text":"(Image: )","category":"page"},{"location":"#Circle-of-Fifths","page":"GraphvizDotLang.jl","title":"Circle of Fifths","text":"","category":"section"},{"location":"","page":"GraphvizDotLang.jl","title":"GraphvizDotLang.jl","text":"using GraphvizDotLang: digraph, edge, node, attr, HTML, save\nusing Printf: @sprintf\n\na_freq = 440.0\nnote_names = [\n    \"c\", \"c♯\", \"d\", \"d♯\", \"e\", \"f\", \"f♯\", \"g\", \"g♯\", \"a\", \"a♯\", \"b\"\n]\nnote_values = Dict(n => i for (i, n) in enumerate(note_names))\n\nfunction equal_tempered(note)\n    a_freq * 2^((note_values[note] - note_values[\"a\"]) / 12)\nend\n\ng = digraph(label=\"The Circle of Fifths and 12 tone equal temperament\",\n            layout=\"neato\", start=\"regular\", rankdir=\"LR\") |>\n    attr(:node; shape=\"record\", style=\"rounded\") |>\n    attr(:edge; len=\"1.2\")\nfor (i, n) in enumerate(note_names)\n    et_freq = equal_tempered(n)\n    g |>\n        node(n; label=HTML(@sprintf \"<b>%s</b> | %4.1fHz\" n et_freq)) |>\n        edge(n, note_names[(i + 6) % 12 + 1])\nend\nsave(g, \"circle_of_fifths.svg\")","category":"page"},{"location":"","page":"GraphvizDotLang.jl","title":"GraphvizDotLang.jl","text":"(Image: )","category":"page"},{"location":"#Twelve-colors","page":"GraphvizDotLang.jl","title":"Twelve colors","text":"","category":"section"},{"location":"","page":"GraphvizDotLang.jl","title":"GraphvizDotLang.jl","text":"# After an example by Costa Shulyupin\nusing GraphvizDotLang: digraph, edge, node, save, attr\n\ncolors = Dict(\n    \"orange\"      => [],\n    \"deeppink\"    => [],\n    \"purple\"      => [],\n    \"deepskyblue\" => [],\n    \"springgreen\" => [],\n    \"yellowgreen\" => [],\n    \"yellow\"      => [\"yellowgreen\", \"orange\"],\n    \"red\"         => [\"orange\", \"yellow\", \"white\", \"magenta\", \"deeppink\"],\n    \"magenta\"     => [\"purple\", \"deeppink\"],\n    \"blue\"        => [\"deepskyblue\", \"cyan\", \"white\", \"magenta\", \"purple\"],\n    \"cyan\"        => [\"springgreen\", \"deepskyblue\"],\n    \"green\"       => [\"yellowgreen\", \"yellow\", \"white\", \"cyan\", \"springgreen\"],\n    \"white\"       => [])\n\nwhite_text = Set([\"blue\", \"green\", \"purple\", \"red\", \"magenta\", \"deeppink\"])\n\ng = digraph(\"Twelve_colors\"; layout=\"neato\", normalize=\"0\", start=\"regular\") |>\n    attr(:node; shape=\"circle\", style=\"filled\", width = \"1.5\") |>\n    attr(:edge; len=\"2\")\n    for (c, others) in colors\n    g |> node(c; fillcolor=c, fontcolor=c ∈ white_text ? \"white\" : \"black\")\n    for o in others\n        g |> edge(c, o)\n    end\nend\nsave(g, \"twelve_colors.svg\"; engine=\"neato\")","category":"page"},{"location":"","page":"GraphvizDotLang.jl","title":"GraphvizDotLang.jl","text":"(Image: )","category":"page"},{"location":"#API","page":"GraphvizDotLang.jl","title":"API","text":"","category":"section"},{"location":"","page":"GraphvizDotLang.jl","title":"GraphvizDotLang.jl","text":"CurrentModule = GraphvizDotLang","category":"page"},{"location":"","page":"GraphvizDotLang.jl","title":"GraphvizDotLang.jl","text":"graph\ndigraph\nsubgraph\nnode\nedge\nattr","category":"page"},{"location":"#GraphvizDotLang.graph","page":"GraphvizDotLang.jl","title":"GraphvizDotLang.graph","text":"graph(name = nothing; kwargs ...)\n\nCreate a Graph object for undirected graphs. Each of the keyword arguments is added as a graph attribute.\n\njulia> graph(\"hello\"; fontname=\"sans serif\", bgcolor=\"#fff0e0\") |>\n       edge(\"a\", \"b\")\ngraph \"hello\" {\n  graph[bgcolor=\"#fff0e0\";fontname=\"sans serif\";];\n  \"a\"--\"b\";\n}\n\n\n\n\n\n","category":"function"},{"location":"#GraphvizDotLang.digraph","page":"GraphvizDotLang.jl","title":"GraphvizDotLang.digraph","text":"digraph(name = nothing; kwargs ...)\n\nCreate a Graph object for directed graphs.\n\njulia> digraph() |>\n       edge(\"a\", \"b\")\ndigraph {\n  \"a\"->\"b\";\n}\n\n\n\n\n\n","category":"function"},{"location":"#GraphvizDotLang.subgraph","page":"GraphvizDotLang.jl","title":"GraphvizDotLang.subgraph","text":"subgraph(parent::Union{Graph,Subgraph}, name=nothing; kwargs...)\n\nCreate new subgraph. Returns the subgraph.\n\n\n\n\n\n","category":"function"},{"location":"#GraphvizDotLang.node","page":"GraphvizDotLang.jl","title":"GraphvizDotLang.node","text":"node(id::String, port::Union{String,Nothing}=nothing; kwargs...)\n\nAdd node to a graph.\n\njulia> graph() |> node(\"Node\"; fillcolor=\"red\", fontcolor=\"white\")\ngraph {\n  \"Node\"[fillcolor=\"red\";fontcolor=\"white\";];\n}\n\n\n\n\n\n","category":"function"},{"location":"#GraphvizDotLang.edge","page":"GraphvizDotLang.jl","title":"GraphvizDotLang.edge","text":"edge(from::String, to::String ...; kwargs ...)\n\nAdd an edge to a graph.\n\njulia> graph() |> edge(\"a\", \"b\"; label=\"connect!\")\ngraph {\n  \"a\"--\"b\"[label=\"connect!\";];\n}\njulia> digraph() |> edge(\"a\", \"b\", \"c\"; label=\"direct!\")\ndigraph {\n  \"a\"->\"b\"->\"c\"[label=\"direct!\";];\n}\n\n\n\n\n\n","category":"function"},{"location":"#GraphvizDotLang.attr","page":"GraphvizDotLang.jl","title":"GraphvizDotLang.attr","text":"attr(symb::Symbol; attrs...)\n\nAdd attributes to the graph. The symb argument must be one of [:graph, :node, :edge].\n\n\n\n\n\n","category":"function"}]
}
