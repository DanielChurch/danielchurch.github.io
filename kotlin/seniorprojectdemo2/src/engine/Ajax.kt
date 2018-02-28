package engine

class Ajax {
    companion object {
        fun read(url: String, async: Boolean) = js("""
                ${'$'}.ajax({
                    type: "GET",
                    url: url,
                    async: async
                }).responseText;
        """) as String}
}