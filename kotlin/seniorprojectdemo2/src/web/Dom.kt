package web

import org.w3c.dom.*
import kotlin.browser.document

class Dom {
    companion object {
        val body = document.body as HTMLElement
        fun body(vararg children: Any) = append(document.body as Element, children) as HTMLBodyElement
        fun div(vararg children: Any) = append(document.createElement("div"), children) as HTMLDivElement
        fun canvas(vararg children: Any) = append(document.createElement("canvas"), children) as HTMLCanvasElement
        fun a(vararg children: Any) = append(document.createElement("a"), children) as HTMLAnchorElement
        fun p(vararg children: Any) = append(document.createElement("p"), children) as HTMLParagraphElement
        fun input(vararg children: Any) = append(document.createElement("input"), children) as HTMLInputElement
        fun label(vararg children: Any) = append(document.createElement("label"), children) as HTMLLabelElement
        fun span(vararg children: Any) = append(document.createElement("span"), children) as HTMLSpanElement
        fun h1(vararg children: Any) = append(document.createElement("h1"), children) as HTMLHeadingElement
        fun h2(vararg children: Any) = append(document.createElement("h2"), children) as HTMLHeadingElement
        fun pre(vararg children: Any) = append(document.createElement("pre"), children) as HTMLPreElement
        fun code(vararg children: Any) = append(document.createElement("code"), children) as HTMLElement

        private fun append(element: Element, children: Array<out Any>): Element {
            children.forEach {
                if (it is String) {
                    element.textContent += it
                } else {
                    element.append(it)
                }
            }
            return element
        }
    }
}